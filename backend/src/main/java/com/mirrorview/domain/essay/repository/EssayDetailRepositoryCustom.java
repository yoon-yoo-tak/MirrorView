package com.mirrorview.domain.essay.repository;

import java.util.List;

import com.mirrorview.domain.essay.dto.EssayDetailDto;

public interface EssayDetailRepositoryCustom {
	List<EssayDetailDto> findEssayByEssayId(Long essayId);
}
