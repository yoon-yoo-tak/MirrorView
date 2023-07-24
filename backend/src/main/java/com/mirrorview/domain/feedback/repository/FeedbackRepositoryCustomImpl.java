package com.mirrorview.domain.feedback.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mirrorview.domain.essay.domain.QEssay;
import com.mirrorview.domain.essay.domain.QEssayDetail;
import com.mirrorview.domain.feedback.domain.QFeedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.user.domain.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FeedbackRepositoryCustomImpl implements FeedbackRepositoryCustom {
	private final JPAQueryFactory queryFactory;


	QFeedback qFeedback = QFeedback.feedback;
	QEssay essay = QEssay.essay;
	QEssayDetail essayDetail = QEssayDetail.essayDetail;
	QMember member = QMember.member;
	@Override
	public List<FeedbackDto> findFeedbackByUserId(String userId){
		return queryFactory.select(Projections.constructor(FeedbackDto.class, qFeedback.content, qFeedback.createdTime, qFeedback.roomId))
			.from(qFeedback)
			.join(qFeedback.essayDetail, essayDetail)
			.join(essayDetail.essay, essay)
			.join(essay.member, member)
			.where(qFeedback.essayDetail.eq(essayDetail)
				.and(essay.member.eq(member))
				.and(member.userId.eq(userId)))
			.fetch();
	}

	@Override
	public List<FeedbackDto> findFeedbackByRoomId(Long roomId) {
		return queryFactory.select(Projections.constructor(FeedbackDto.class, qFeedback.content, qFeedback.createdTime, qFeedback.roomId))
			.from(qFeedback)
			.where(qFeedback.roomId.eq(roomId))
			.fetch();
	}
}
