package com.mirrorview.domain.essay.repository;

import java.util.List;

import com.mirrorview.domain.essay.dto.EssayDto;

public interface EssayRepositoryCustom {
	List<EssayDto> findEssayByUserId(String userId);

}
