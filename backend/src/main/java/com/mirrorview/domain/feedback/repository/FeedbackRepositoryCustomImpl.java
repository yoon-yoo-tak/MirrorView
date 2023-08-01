package com.mirrorview.domain.feedback.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.domain.QEssay;
import com.mirrorview.domain.essay.domain.QEssayDetail;
import com.mirrorview.domain.feedback.domain.QFeedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.user.domain.Member;
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
		return queryFactory.select(Projections.constructor(FeedbackDto.class,
				qFeedback.id,
				qFeedback.content,
				qFeedback.createdTime,
				qFeedback.roomId,
				qFeedback.writer.nickname,
				essayDetail.question,
				essayDetail.answer))
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
		return queryFactory.select(Projections.constructor(FeedbackDto.class, qFeedback.id ,qFeedback.content, qFeedback.createdTime, qFeedback.roomId, member.nickname))
			.from(qFeedback)
			.where(qFeedback.roomId.eq(roomId))
			.fetch();
	}

	@Override
	public FeedbackDto findFeedbackByFeedbackId(Long feedbackId) {
		return queryFactory.select(Projections.constructor(FeedbackDto.class, qFeedback.id,qFeedback.content, qFeedback.createdTime, qFeedback.roomId, member.nickname))
			.from(qFeedback)
			.where(qFeedback.id.eq(feedbackId))
			.fetchOne();
	}

	@Override
	public void deleteFeedbackByFeedbackId(Long feedbackId) {
		queryFactory.delete(qFeedback)
			.where(qFeedback.id.eq(feedbackId))
			.execute();
	}

	@Override
	public void deleteFeedbackByEssayDetailIdAndUserId(EssayDetail essayDetail, Member member) {
		queryFactory.delete(qFeedback)
			.where(qFeedback.essayDetail.eq(essayDetail)
				.and(qFeedback.writer.eq(member)))
			.execute();
	}

	@Override
	public void deleteFeedbacksByEssayDetailId(EssayDetail essayDetail) {
		queryFactory.delete(qFeedback)
			.where(qFeedback.essayDetail.eq(essayDetail))
			.execute();
	}
}
