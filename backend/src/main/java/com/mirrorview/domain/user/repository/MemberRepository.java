package com.mirrorview.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.user.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	boolean existsByUserId(String userId);

	Optional<Member> findByUserId(String userId);
}
