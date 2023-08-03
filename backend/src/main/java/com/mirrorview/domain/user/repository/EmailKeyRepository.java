package com.mirrorview.domain.user.repository;

import com.mirrorview.domain.user.domain.EmailKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailKeyRepository extends JpaRepository<EmailKey, Long> {

    Optional<EmailKey> findByEmail(String email);

    Optional<EmailKey> findByEmailAndKey(String email, String key);
}
