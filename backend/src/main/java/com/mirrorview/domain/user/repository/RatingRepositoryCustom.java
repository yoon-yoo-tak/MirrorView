package com.mirrorview.domain.user.repository;

import com.mirrorview.domain.user.domain.Member;

public interface RatingRepositoryCustom {

	Long findCount(Member member);
}
