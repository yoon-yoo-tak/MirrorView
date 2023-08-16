package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.dto.EssayDetailDto;

import java.util.List;

public interface EssayDetailRepositoryCustom {
    List<EssayDetailDto> findEssayByEssayId(Long essayId);

    void deleteEssayDetailByEssayId(Essay essay);
}
