package com.mirrorview.domain.interview.controller;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(value = "Interview", tags = {"InterView Controller"})
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    @GetMapping("/rooms")
    public ResponseEntity<?> getRooms(
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String interviewType) {
        return BaseResponse.okWithData(HttpStatus.OK, "방 정보 조회 완료", interviewService.findRoom());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto requestDto,
                                        @AuthenticationPrincipal CustomMemberDetails member) {


        InterviewRoom interviewRoom = interviewService.create(member.getUser(), requestDto);
        return BaseResponse.okWithData(HttpStatus.OK, "테스트", interviewRoom);
    }

    @PostMapping("/exit/{roomId}")
    public ResponseEntity<?> exitRoom(@AuthenticationPrincipal CustomMemberDetails member,
                                      @PathVariable String roomId) {
        String nickname = member.getNickname();
        try {
            interviewService.exitRoom(nickname, roomId);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }
        return BaseResponse.ok(HttpStatus.OK, "나가기 완료");
    }

    @PostMapping("join/{roomId}")
    public ResponseEntity<?> joinRoom(@AuthenticationPrincipal CustomMemberDetails member,
        @PathVariable String roomId, @RequestBody Map<String, String> passwordMap) {
        log.info("db 가져오기");
        InterviewRoom interview;
        String password = passwordMap.get("password");
        try {
            interview = interviewService.joinRoom(member.getUser(), roomId, password);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }
        return BaseResponse.okWithData(HttpStatus.OK, "조인 완료", interview);
    }

    @GetMapping("/rooms/{category}")
    public ResponseEntity<?> searchRooms(@PathVariable("category") String category) {
        List<RoomResponseDto> list = interviewService.findRoomByCategory(category);
        return BaseResponse.okWithData(HttpStatus.OK, "카테고리로 조회 성공", list);
    }
}
