package com.mirrorview.domain.essay.repository;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.QEssay;
import com.mirrorview.domain.essay.domain.QEssayDetail;
import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class EssayDetailRepositoryCustomImpl implements EssayDetailRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QEssayDetail essayDetail = QEssayDetail.essayDetail;
    QEssay essay = QEssay.essay;

    @Override
    public List<EssayDetailDto> findEssayByEssayId(Long essayId) {
        return jpaQueryFactory.select(
                        Projections.constructor(EssayDetailDto.class, essayDetail.id, essayDetail.question, essayDetail.answer))
                .from(essayDetail)
                .join(essayDetail.essay, essay)
                .where(essay.id.eq(essayId))
                .fetch();
    }

    @Override
    public void deleteEssayDetailByEssayId(Essay essay) {
        jpaQueryFactory.delete(essayDetail)
                .where(essayDetail.essay.eq(essay))
                .execute();
    }
}
