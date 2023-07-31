package com.mirrorview.domain.essay.service;

import java.util.List;

import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayUpdateDto;

public interface EssayDetailService {
	List<EssayDetailDto> findEssayByEssayId(Long essayId);
	void updateEssayDetails(EssayUpdateDto essayUpdateDto, String userId);
}
