package com.mirrorview.domain.essay.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.dto.EssayCreateDto;
import com.mirrorview.domain.essay.dto.EssayDto;

public interface EssayService {
	Page<EssayDto> findEssayByUserId(String userId, Pageable pageable);

	void insertEssayAndEssayDetails(EssayCreateDto essays, String userId);

	Optional<Essay> findById(Long id);

	void deleteByEssayId(Long id);
}
