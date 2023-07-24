package com.mirrorview.domain.feedback.service;

import java.util.List;

import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;

public interface FeedbackService {

	List<FeedbackDto> findFeedbackByUserId(String userId);
	List<FeedbackDto> findFeedbackByRoomId(Long roomId);
}
