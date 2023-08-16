package com.mirrorview.domain.interview.repository;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends CrudRepository<InterviewRoom, String> {
    List<InterviewRoom> findByCategory(String category);
}
