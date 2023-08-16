package com.mirrorview.domain.admin.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.admin.dto.ReportRequestDto;

public interface ReportService {
    void reportMember(String userId, ReportRequestDto requestDto);
    Page<ReportListDto> getList(Pageable pageable);
    List<ReportDetailDto> getContent(String nickname);
    void banMember(String nickname);
}
