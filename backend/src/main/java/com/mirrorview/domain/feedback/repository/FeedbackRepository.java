package com.mirrorview.domain.feedback.repository;

import java.util.List;

import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.user.domain.Member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	List<Feedback> findByRoomId(String roomId);
	Page<Feedback> findByReceiver(Member member, Pageable pageable);
	void deleteByRoomId(String roomId);
}
