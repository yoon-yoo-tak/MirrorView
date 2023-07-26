package com.mirrorview.domain.feedback.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.repository.FeedbackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;

	@Override
	public List<FeedbackDto> findFeedbackByUserId(String userId) {
		return feedbackRepository.findFeedbackByUserId(userId);
	}

	@Override
	public List<FeedbackDto> findFeedbackByRoomId(Long roomId){
		return feedbackRepository.findFeedbackByRoomId(roomId);
	}

	@Override
	public FeedbackDto findFeedbackByFeedbackId(Long feedbackId) {
		return feedbackRepository.findFeedbackByFeedbackId(feedbackId);
	}

	@Override
	@Transactional
	public void deleteFeedbackByFeedbackId(Long feedbackId) {
		feedbackRepository.deleteFeedbackByFeedbackId(feedbackId);
	}
}
