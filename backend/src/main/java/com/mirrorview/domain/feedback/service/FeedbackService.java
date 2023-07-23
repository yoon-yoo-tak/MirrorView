package com.mirrorview.domain.feedback.service;

import java.util.List;

import com.mirrorview.domain.feedback.domain.Feedback;

public interface FeedbackService {

	List<Feedback> findAllByEssayDetailId(Long essayDetailId);
}
