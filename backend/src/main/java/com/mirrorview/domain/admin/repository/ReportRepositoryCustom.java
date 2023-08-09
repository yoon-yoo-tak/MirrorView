package com.mirrorview.domain.admin.repository;

import java.util.List;

import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.user.domain.Member;
import com.querydsl.core.Tuple;

public interface ReportRepositoryCustom {
	List<ReportListDto> reportList();
	List<ReportDetailDto> reportContent(Member member);
}
