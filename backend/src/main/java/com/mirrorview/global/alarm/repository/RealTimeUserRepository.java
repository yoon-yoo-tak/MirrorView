package com.mirrorview.global.alarm.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mirrorview.global.alarm.domain.RealTimeUser;

@Repository
public interface RealTimeUserRepository extends CrudRepository<RealTimeUser, String> {
	List<RealTimeUser> findAll();
}
