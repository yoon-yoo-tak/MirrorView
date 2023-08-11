package com.mirrorview.domain.friend.controller;

import com.mirrorview.domain.friend.dto.FriendDto;
import com.mirrorview.domain.friend.service.FriendService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendService friendService;

    @GetMapping
    public ResponseEntity<?> getFriends(@AuthenticationPrincipal CustomMemberDetails member) {
        String userId = member.getUsername();
        List<FriendDto> friends = friendService.getFriends(userId);
        System.out.println(friends);
        return BaseResponse.okWithData(HttpStatus.OK, "조회 완료", friends);
    }

    @GetMapping("/request")
    public ResponseEntity<?> getFriendRequests(@AuthenticationPrincipal CustomMemberDetails member) {
        String userId = member.getUsername();
        List<FriendDto> friendRequests = friendService.getFriendRequests(userId);
        return BaseResponse.okWithData(HttpStatus.OK, "내가 요청받은 목록 불러오기 완료", friendRequests);
    }

    @GetMapping("/wait")
    public ResponseEntity<?> getSentFriendRequests(@AuthenticationPrincipal CustomMemberDetails memberDetails) {
        String userId = memberDetails.getUsername();
        List<FriendDto> sentFriendRequests = friendService.getSentFriendRequests(userId);
        return BaseResponse.okWithData(HttpStatus.OK, "내가 요청한 목록 불러오기 완료", sentFriendRequests);

    }

    @GetMapping("/status/{userId}")
    public ResponseEntity<?> getFriendStatus(@AuthenticationPrincipal CustomMemberDetails member,
                                             @PathVariable("userId") String otherUserId) {
        String myUserid = member.getUsername();
        String friendStatus = friendService.getFriendStatus(myUserid, otherUserId);

        return BaseResponse.okWithData(HttpStatus.OK, "ok", friendStatus);
    }

    @PostMapping("/request/{userId}")
    public ResponseEntity<?> requestFriend(@AuthenticationPrincipal CustomMemberDetails member,
                                           @PathVariable("userId") String otherUserId) {
        Boolean isSaved = friendService.save(member.getUsername(), otherUserId);
        if (isSaved) {
            return BaseResponse.ok(HttpStatus.OK, "친구 요청 성공");
        }
        return BaseResponse.fail("친구 요청 실패", 400);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteFriend(@AuthenticationPrincipal CustomMemberDetails member,
                                          @PathVariable("userId") String otherUserId) {
        Boolean isDeleted = friendService.delete(member.getUsername(), otherUserId);
        if (isDeleted) {
            return BaseResponse.ok(HttpStatus.OK, "삭제 완료");
        }
        return BaseResponse.fail("친구 삭제 실패", 400);
    }

    @PatchMapping("/request/{userId}")
    public ResponseEntity<?> acceptFriendRequest(@AuthenticationPrincipal CustomMemberDetails member,
                                                 @PathVariable("userId") String otherUserId) {
        try {
            friendService.acceptRequest(member.getUsername(), otherUserId);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }

        return BaseResponse.ok(HttpStatus.OK, "친구 수락 완료");
    }
}
