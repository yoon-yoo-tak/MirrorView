package com.mirrorview.domain.feedback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.feedback.domain.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> , FeedbackRepositoryCustom {
	List<Feedback> findAllByEssayDetailIdOrderByCreatedTimeDesc(Long essayDetailId);
}
