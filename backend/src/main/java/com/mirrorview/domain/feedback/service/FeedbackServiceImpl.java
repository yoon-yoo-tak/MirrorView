package com.mirrorview.domain.feedback.service;

import java.util.List;

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
	public List<Feedback> findAllByEssayDetailId(Long essayDetailId) {
		return feedbackRepository.findAllByEssayDetailIdOrderByCreatedTimeDesc(essayDetailId);
	}

	@Override
	public List<FeedbackDto> findFeedbackByUserId(String userId) {
		return feedbackRepository.findFeedbackByUserId(userId);
	}
}
