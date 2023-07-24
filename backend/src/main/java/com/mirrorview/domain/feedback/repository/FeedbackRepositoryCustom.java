package com.mirrorview.domain.feedback.repository;

import java.util.List;

import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;

public interface FeedbackRepositoryCustom {

	List<FeedbackDto> findFeedbackByUserId(String userId);
}
