package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.QEssay;
import com.mirrorview.domain.essay.dto.EssayDto;
import com.mirrorview.domain.user.domain.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class EssayRepositoryCustomImpl implements EssayRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QEssay essay = QEssay.essay;
    QMember member = QMember.member;

    @Override
    public List<EssayDto> findEssayByUserId(String userId) {
        return jpaQueryFactory.select(Projections.constructor(EssayDto.class, essay.id, essay.title, essay.createdTime))
                .from(essay)
                .join(essay.member, member)
                .where(essay.member.eq(member)
                        .and(member.userId.eq(userId)))
                .fetch();
    }
}
