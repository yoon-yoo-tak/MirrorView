package com.mirrorview.domain.feedback.service;

import java.util.List;

import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.dto.FeedbackListDto;
import com.mirrorview.domain.feedback.dto.FeedbackSaveDto;

public interface FeedbackService {

	List<FeedbackListDto> findFeedbackByUserId(String userId);
	//
	List<FeedbackDto> findFeedbackByRoomId(String roomId);
	//
	// FeedbackDto findFeedbackByFeedbackId(Long feedbackId);
	//
	void saveFeedback(FeedbackSaveDto dto, String senderId);
	void deleteByRoomId(String roomId);
}
