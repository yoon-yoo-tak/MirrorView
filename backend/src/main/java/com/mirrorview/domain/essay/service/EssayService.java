package com.mirrorview.domain.essay.service;

import java.util.List;

import com.mirrorview.domain.essay.dto.EssayCreateDto;
import com.mirrorview.domain.essay.dto.EssayDto;

public interface EssayService {
	List<EssayDto> findEssayByUserId(String userId);

	void insertEssayAndEssayDetails(EssayCreateDto essays, String userId);
}
