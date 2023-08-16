package com.mirrorview.domain.admin.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.user.domain.Member;
import com.querydsl.core.Tuple;

public interface ReportRepositoryCustom {
	Page<ReportListDto> reportList(Pageable pageable);
	List<ReportDetailDto> reportContent(Member member);
}
