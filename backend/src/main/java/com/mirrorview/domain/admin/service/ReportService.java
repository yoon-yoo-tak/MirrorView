package com.mirrorview.domain.admin.service;

import com.mirrorview.domain.admin.dto.ReportRequestDto;

public interface ReportService {
    void reportMember(String userId, ReportRequestDto requestDto);
}
