package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.EssayDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayDetailRepository extends JpaRepository<EssayDetail, Long>, EssayDetailRepositoryCustom {
}
