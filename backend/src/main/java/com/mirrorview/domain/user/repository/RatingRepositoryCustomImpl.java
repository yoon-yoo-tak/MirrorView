package com.mirrorview.domain.user.repository;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.domain.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.mirrorview.domain.user.domain.QRating.rating;

@Repository
@RequiredArgsConstructor
public class RatingRepositoryCustomImpl implements RatingRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Long findCount(Member member) {

        return jpaQueryFactory.select(rating.count())
                .from(rating)
                .join(rating.rated, QMember.member)
                .where(QMember.member.eq(member))
                .fetchFirst();

    }
}
