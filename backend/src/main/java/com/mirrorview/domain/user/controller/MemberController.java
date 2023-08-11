package com.mirrorview.domain.user.controller;

import com.mirrorview.domain.friend.service.FriendService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.*;
import com.mirrorview.domain.user.service.EmailService;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;
    private final FriendService friendService;

    @PostMapping
    public ResponseEntity<?> join(@RequestBody JoinDto joinDto) {
        try {
            // emailService.checkEmail(joinDto.getEmail());
            memberService.save(joinDto);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }
        return BaseResponse.okWithData(HttpStatus.OK, "회원가입 완료", joinDto);
    }

    @GetMapping("/{userId}/check-id")
    public ResponseEntity<?> checkUserid(@PathVariable String userId) {
        boolean isDuplicatedMember = memberService.duplicatedUserId(userId);
        if (isDuplicatedMember) {
            return BaseResponse.fail("사용할 수 없는 아이디입니다", 400);
        }
        return BaseResponse.ok(HttpStatus.OK, "사용가능한 아이디입니다.");
    }

    @PostMapping("/{email}")
    public ResponseEntity<?> checkEmailKey(@PathVariable String email, @RequestBody Map<String, String> map) {
        String key = map.getOrDefault("key", "empty");
        if (key.equals("empty")) {
            return BaseResponse.fail("클라이언트 서버 에러", 501);
        }
        boolean isChecked = emailService.checkKey(email, key);
        if (!isChecked) {
            return BaseResponse.fail("다시 입력해주세요.", 400);
        }
        return BaseResponse.ok(HttpStatus.OK, "암호 확인 완료");
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> sendEmailKey(@PathVariable String email) {
        boolean complete = emailService.sendEmail(email);
        if (complete) {
            return BaseResponse.okWithData(HttpStatus.OK, "이메일 전송이 완료되었습니다.", email);
        }
        return BaseResponse.fail("이메일 전송 오류", 500);
    }

    @GetMapping("/{nickname}/check-nickname")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        try {
            boolean isDuplicated = memberService.duplicatedNickname(nickname);
            if (isDuplicated) {
                throw new IllegalArgumentException("중복된 닉네임 입니다.");
            }
        } catch (IllegalArgumentException e) {
            return BaseResponse.fail(e.getMessage(), 400);
        } catch (Exception e) {
            return BaseResponse.fail("서버에러", 500);
        }
        return BaseResponse.ok(HttpStatus.OK, "사용 가능한 닉네임입니다.");
    }

    @GetMapping("/find/id")
    public ResponseEntity<?> findUserId(@RequestParam String email) {
        log.info("email = {}", email);
        FindMemberRequestDto requestDto = FindMemberRequestDto
                .builder().
                email(email)
                .build();
        log.info("dto = {}", requestDto);
        if (requestDto == null || requestDto.isBlankEmail()) {
            return BaseResponse.fail("잘못된 데이터 형식입니다.", 500);
        }
        String findUserId;
        try {
            findUserId = memberService.findByEmail(requestDto.getEmail());
        } catch (Exception e) {
            log.info("exception !!!!");
            return BaseResponse.fail(e.getMessage(), 400);
        }
        log.info("suecc");
        return BaseResponse.okWithData(HttpStatus.OK, "사용자 아이디 조회 완료", findUserId);
    }

    @GetMapping("/find/password")
    public ResponseEntity<?> findPassword(@RequestParam String userId, @RequestParam String email) {
        //todo email html 문장 변형하기
        log.info("userId = {}", userId);
        log.info("email = {}", email);
        FindMemberRequestDto requestDto = FindMemberRequestDto
                .builder()
                .userId(userId)
                .email(email)
                .build();
        if (requestDto == null || requestDto.isBlankEmailAndUserId()) {
            return BaseResponse.fail("잘못된 데이터 형식입니다.", 500);
        }
        try {
            Member findMember = memberService.findPassword(requestDto);
            emailService.sendPasswordEmail(findMember);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }
        return BaseResponse.ok(HttpStatus.OK, "이메일 전송 완료");
    }

    @PostMapping("/rating/save")
    public ResponseEntity<?> saveRating(@AuthenticationPrincipal CustomMemberDetails member,
                                        @RequestBody RatingDto ratingDto) {
        float currentScore;
        try {
            String nickname = member.getNickname();
            if (nickname.equals(ratingDto.getNickname())) {
                return BaseResponse.fail("평가 대상이 아닙니다.", 500);
            }
            currentScore = memberService.saveScore(member.getUsername(), ratingDto);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }
        return BaseResponse.okWithData(HttpStatus.OK, "평점 남기기 완료", currentScore);
    }

    @GetMapping("/find/{nickname}")
    public ResponseEntity<?> getOtherMemberInfo(@PathVariable String nickname,
                                                @AuthenticationPrincipal CustomMemberDetails member) {
        String myNickname = member.getNickname();
        if (myNickname.equals(nickname)) {
            return BaseResponse.fail("잘못된 정보", 400);
        }
        Optional<Member> findMember = memberService.findByNickname(nickname);
        log.info("found = {}", findMember.get());
        if (findMember.isEmpty() || findMember.get().getDelete()) {
            return BaseResponse.fail("없는 정보입니다.", 400);
        }
        String friendStatus = friendService.getFriendStatus(member.getUsername(), findMember.get().getUserId());
        MemberResDto responseDto = MemberResDto.build(friendStatus, findMember.get());

        return BaseResponse.okWithData(HttpStatus.OK, "상대 정보 열람", responseDto);
    }

    @GetMapping("/findAll/{input}")
    public ResponseEntity<?> getMemberList(@PathVariable String input) {
        return BaseResponse.okWithData(HttpStatus.OK, "유저 리스트", memberService.findMemberList(input));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        try {

            memberService.deleteMember(userId);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 500);
        }
        return BaseResponse.ok(HttpStatus.OK, "삭제 완료");
    }
}
