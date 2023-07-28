package com.mirrorview.domain.feedback.repository;

import java.util.List;

import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.user.domain.Member;

public interface FeedbackRepositoryCustom {

	List<FeedbackDto> findFeedbackByUserId(String userId);
	List<FeedbackDto> findFeedbackByRoomId(Long roomId);
	FeedbackDto findFeedbackByFeedbackId(Long feedbackId);
	void deleteFeedbackByFeedbackId(Long feedbackId);
	void deleteFeedbackByEssayDetailIdAndUserId(EssayDetail essayDetail, Member member);
	void deleteFeedbacksByEssayDetailId(EssayDetail essayDetail);
}
