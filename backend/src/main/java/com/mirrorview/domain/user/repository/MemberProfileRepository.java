package com.mirrorview.domain.user.repository;

import com.mirrorview.domain.user.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberProfileRepository extends JpaRepository<Member, Long> {
    Member findByUserId(String userId);

    Optional<Member> findByNickname(String nickname);
}
