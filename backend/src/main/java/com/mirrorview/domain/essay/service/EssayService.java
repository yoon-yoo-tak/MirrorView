package com.mirrorview.domain.essay.service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.dto.EssayCreateDto;
import com.mirrorview.domain.essay.dto.EssayDto;

import java.util.List;
import java.util.Optional;

public interface EssayService {
    List<EssayDto> findEssayByUserId(String userId);

    void insertEssayAndEssayDetails(EssayCreateDto essays, String userId);

    Optional<Essay> findById(Long id);

    void deleteByEssayId(Long id);
}
