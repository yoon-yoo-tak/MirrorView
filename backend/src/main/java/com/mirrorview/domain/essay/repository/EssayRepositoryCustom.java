package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.dto.EssayDto;

import java.util.List;

public interface EssayRepositoryCustom {
    List<EssayDto> findEssayByUserId(String userId);

}
