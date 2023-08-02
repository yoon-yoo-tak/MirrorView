package com.mirrorview.domain.notice.service;

import com.mirrorview.domain.notice.domain.Board;
import com.mirrorview.domain.notice.dto.BoardDto;
import com.mirrorview.domain.notice.dto.BoardModifyDto;
import com.mirrorview.domain.notice.dto.BoardWriteDto;
import com.mirrorview.domain.notice.repository.BoardRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public Page<BoardDto> findAll(Pageable pageable) {
        Page<Board> pageBoard = boardRepository.findAllByOrderByIdDesc(pageable);
        List<BoardDto> list = new ArrayList<>();
        for (Board b : pageBoard) {
            BoardDto dto = BoardDto.build(b);
            list.add(dto);
        }
        return new PageImpl<>(list, pageable, pageBoard.getTotalElements());
    }

    @Override
    public BoardDto findById(Long id) {
        Optional<Board> board = boardRepository.findById(id);
        if (board.isPresent()) {
            return BoardDto.build(board.get());
        } else {
            throw new IllegalArgumentException("게시물이 존재하지 않습니다");
        }
    }

    @Override
    public void deleteNotice(Long id) {
        boardRepository.deleteById(id);
    }

    @Override
    public void modifyNotice(BoardModifyDto boardDto) {
        Optional<Board> board = boardRepository.findById(boardDto.getId());
        if (board.isPresent()) {
            board.get().update(boardDto);
        } else {
            throw new IllegalArgumentException("수정 에러");
        }
    }

    @Override
    public void writeNotice(BoardWriteDto dto, String userId) {
        Member member = memberRepository.findByUserId(userId).get();
        Board board = Board.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .member(member)
                .build();
        boardRepository.save(board);
    }
}
