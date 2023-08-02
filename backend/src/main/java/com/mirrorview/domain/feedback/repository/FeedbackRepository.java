package com.mirrorview.domain.feedback.repository;

import com.mirrorview.domain.feedback.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>, FeedbackRepositoryCustom {
}
