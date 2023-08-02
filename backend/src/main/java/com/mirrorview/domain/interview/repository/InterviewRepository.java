package com.mirrorview.domain.interview.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mirrorview.domain.interview.domain.InterviewRoom;

@Repository
public interface InterviewRepository extends CrudRepository<InterviewRoom, String> {
	List<InterviewRoom> findByCategory(String category);
}
