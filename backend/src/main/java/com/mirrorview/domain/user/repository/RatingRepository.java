package com.mirrorview.domain.user.repository;

import com.mirrorview.domain.user.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long>, RatingRepositoryCustom {
}
