package com.mirrorview.domain.essay.service;

import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayUpdateDto;

import java.util.List;

public interface EssayDetailService {
    List<EssayDetailDto> findEssayByEssayId(Long essayId);

    void updateEssayDetails(EssayUpdateDto essayUpdateDto, String userId);
}
