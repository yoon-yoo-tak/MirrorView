package com.mirrorview.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.user.domain.Rating;

public interface RatingRepository extends JpaRepository<Rating,Long>, RatingRepositoryCustom {
}
