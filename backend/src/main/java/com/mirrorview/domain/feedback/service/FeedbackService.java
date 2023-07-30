package com.mirrorview.domain.feedback.service;

import java.util.List;

import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.dto.FeedbackSaveDto;

public interface FeedbackService {

	List<FeedbackDto> findFeedbackByUserId(String userId);

	List<FeedbackDto> findFeedbackByRoomId(Long roomId);

	FeedbackDto findFeedbackByFeedbackId(Long feedbackId);

	void deleteFeedbackByFeedbackId(Long feedbackId);

	void saveFeedback(FeedbackSaveDto dto);
}
