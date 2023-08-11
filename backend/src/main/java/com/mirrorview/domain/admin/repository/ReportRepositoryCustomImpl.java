package com.mirrorview.domain.admin.repository;

import static com.mirrorview.domain.user.domain.QMember.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.mirrorview.domain.admin.domain.QReport;
import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.user.domain.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReportRepositoryCustomImpl implements ReportRepositoryCustom {
	private  final JPAQueryFactory queryFactory;

	QReport qReport = QReport.report;

	@Override
	public Page<ReportListDto> reportList(Pageable pageable) {
		long total = queryFactory.select(qReport.count())
			.from(qReport)
			.join(qReport.reported, member)
			.where(member.delete.eq(Boolean.FALSE))
			.groupBy(qReport.reported)
			.stream().count();

		List<ReportListDto> list = queryFactory.select(Projections.constructor(ReportListDto.class,
				member.nickname, qReport.count()))
			.from(qReport)
			.join(qReport.reported, member)
			.where(member.delete.eq(Boolean.FALSE))
			.groupBy(qReport.reported)
			.orderBy(qReport.count().desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return new PageImpl<>(list, pageable, total);
	}

	@Override
	public List<ReportDetailDto> reportContent(Member reportedMember) {
		return queryFactory
			.select(Projections.constructor(ReportDetailDto.class
			,qReport.reporter.nickname, qReport.content, qReport.reportedTime))
			.from(qReport)
			.join(qReport.reported, member)
			.where(qReport.reported.eq(reportedMember))
			.orderBy(qReport.reportedTime.desc())
			.fetch();
	}
}
