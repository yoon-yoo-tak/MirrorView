package com.mirrorview.domain.essay.repository;

import java.util.List;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.dto.EssayDetailDto;

public interface EssayDetailRepositoryCustom {
	List<EssayDetailDto> findEssayByEssayId(Long essayId);
	void deleteEssayDetailByEssayId(Essay essay);
}
