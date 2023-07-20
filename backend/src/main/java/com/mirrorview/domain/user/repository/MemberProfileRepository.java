package com.mirrorview.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mirrorview.domain.user.domain.Member;

public interface MemberProfileRepository extends JpaRepository<Member, Long> {

	Member findByUserId(String userId);
}
