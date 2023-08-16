package com.mirrorview.domain.feedback.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.dto.FeedbackListDto;
import com.mirrorview.domain.feedback.dto.FeedbackSaveDto;

public interface FeedbackService {

	Page<FeedbackDto> findFeedbackByUserId(String userId, Pageable pageable);
	//
	List<FeedbackDto> findFeedbackByRoomId(String roomId);
	//
	// FeedbackDto findFeedbackByFeedbackId(Long feedbackId);
	//
	void saveFeedback(FeedbackSaveDto dto, String senderId);
	void deleteByRoomId(String roomId);
}
