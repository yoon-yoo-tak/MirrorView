package com.mirrorview.domain.essay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.essay.domain.Essay;

public interface EssayRepository extends JpaRepository<Essay, Long> , EssayRepositoryCustom{
	Essay findByMemberId(Long memberId);

}
