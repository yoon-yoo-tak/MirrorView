package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.Essay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayRepository extends JpaRepository<Essay, Long>, EssayRepositoryCustom {
}
