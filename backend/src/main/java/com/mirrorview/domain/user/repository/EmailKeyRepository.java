package com.mirrorview.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.user.domain.EmailKey;

public interface EmailKeyRepository extends JpaRepository<EmailKey, Long> {

	Optional<EmailKey> findByEmail(String email);

	Optional<EmailKey> findByEmailAndKey(String email, String key);
}
