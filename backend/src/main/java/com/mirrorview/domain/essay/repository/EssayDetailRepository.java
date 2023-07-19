package com.mirrorview.domain.essay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.essay.domain.EssayDetail;

public interface EssayDetailRepository extends JpaRepository<EssayDetail, Long> {
}
