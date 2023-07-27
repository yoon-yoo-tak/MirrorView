package com.mirrorview.domain.essay.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mirrorview.domain.essay.domain.QEssayDetail;
import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EssayDetailRepositoryCustomImpl implements EssayDetailRepositoryCustom{

	private final JPAQueryFactory jpaQueryFactory;

	QEssayDetail essayDetail = QEssayDetail.essayDetail;

	@Override
	public List<EssayDetailDto> findEssayByEssayId(Long essayId) {
		return jpaQueryFactory.select(
				Projections.constructor(EssayDetailDto.class, essayDetail.id, essayDetail.question, essayDetail.answer))
			.from(essayDetail)
			.where(essayDetail.id.eq(essayId))
			.fetch();
	}
}
