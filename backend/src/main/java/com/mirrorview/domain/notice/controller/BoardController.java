package com.mirrorview.domain.notice.controller;

import com.mirrorview.domain.notice.dto.BoardDto;
import com.mirrorview.domain.notice.dto.BoardModifyDto;
import com.mirrorview.domain.notice.dto.BoardWriteDto;
import com.mirrorview.domain.notice.service.BoardService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<?> getList(@PageableDefault(size = 5) Pageable pageable) {
        Page<BoardDto> list = boardService.findAll(pageable);
        return BaseResponse.okWithData(HttpStatus.OK, "공지사항 목록 불러오기 성공", list);
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> writeNotice(@RequestBody BoardWriteDto dto, @AuthenticationPrincipal CustomMemberDetails member) {
        try {
            boardService.writeNotice(dto, member.getUsername());
            return BaseResponse.ok(HttpStatus.OK, "공지사항 작성 성공");
        } catch (Exception e) {
            return BaseResponse.fail("공지사항 작성 실패", 400);
        }
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> viewNotice(@PathVariable("boardId") Long boardId) {
        try {
            BoardDto boardDto = boardService.findById(boardId);
            return BaseResponse.okWithData(HttpStatus.OK, "공지사항 조회 성공", boardDto);
        } catch (Exception e) {
            return BaseResponse.fail("공지사항 조회 실패", 400);
        }
    }

    @DeleteMapping("/{boardId}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> deleteNotice(@PathVariable("boardId") Long boardId) {
        try {
            boardService.deleteNotice(boardId);
            return BaseResponse.ok(HttpStatus.OK, "삭제 성공");
        } catch (Exception e) {
            return BaseResponse.fail("삭제 실패", 400);
        }

    }

    @PatchMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> modifyNotice(@RequestBody BoardModifyDto boardDto) {
        try {
            System.out.println("id : " + boardDto.getId());
            boardService.modifyNotice(boardDto);
            return BaseResponse.ok(HttpStatus.OK, "공지사항 수정 성공");
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage(), 400);
        }

    }
}
