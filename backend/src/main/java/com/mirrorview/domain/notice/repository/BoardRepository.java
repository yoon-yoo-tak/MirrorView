package com.mirrorview.domain.notice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.notice.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
	Page<Board> findAllByOrderByIdDesc(Pageable pageable);
}
