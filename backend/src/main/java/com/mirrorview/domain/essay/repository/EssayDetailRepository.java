package com.mirrorview.domain.essay.repository;

import java.util.List;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EssayDetailRepository extends JpaRepository<EssayDetail, Long>, EssayDetailRepositoryCustom {
	List<EssayDetail> findByEssay(Essay essay);
}
