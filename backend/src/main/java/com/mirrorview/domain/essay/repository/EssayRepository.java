package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.user.domain.Member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayRepository extends JpaRepository<Essay, Long>, EssayRepositoryCustom {
	Page<Essay> findByMember(Member member, Pageable pageable);
}
