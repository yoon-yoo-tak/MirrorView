package com.mirrorview.domain.admin.service;

import java.util.List;

import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.admin.dto.ReportRequestDto;

public interface ReportService {
    void reportMember(String userId, ReportRequestDto requestDto);
    List<ReportListDto> getList();
    List<ReportDetailDto> getContent(String nickname);
    void banMember(String nickname);
}
