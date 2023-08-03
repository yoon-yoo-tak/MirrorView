package com.mirrorview.domain.notice.service;

import com.mirrorview.domain.notice.dto.BoardDto;
import com.mirrorview.domain.notice.dto.BoardModifyDto;
import com.mirrorview.domain.notice.dto.BoardWriteDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Page<BoardDto> findAll(Pageable pageable);

    BoardDto findById(Long id);

    void deleteNotice(Long id);

    void modifyNotice(BoardModifyDto boardDto);

    void writeNotice(BoardWriteDto dto, String userId);
}
