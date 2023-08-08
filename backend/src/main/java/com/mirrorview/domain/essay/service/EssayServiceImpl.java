package com.mirrorview.domain.essay.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.dto.EssayCreateDto;
import com.mirrorview.domain.essay.dto.EssayDetailCreateDto;
import com.mirrorview.domain.essay.dto.EssayDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.essay.repository.EssayRepository;
import com.mirrorview.domain.feedback.repository.FeedbackRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EssayServiceImpl implements EssayService {

    private final EssayRepository essayRepository;
    private final MemberRepository memberRepository;
    private final EssayDetailRepository essayDetailRepository;
    private final FeedbackRepository feedbackRepository;

    @Override
    public Page<EssayDto> findEssayByUserId(String userId, Pageable pageable) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저"));
        Page<Essay> pageEssay = essayRepository.findByMember(member, pageable);
        List<EssayDto> list = new ArrayList<>();
        for(Essay e: pageEssay){
            EssayDto dto = EssayDto.toDto(e);
            list.add(dto);
        }
        return new PageImpl<>(list, pageable, pageEssay.getTotalElements());
    }

    @Override
    public void insertEssayAndEssayDetails(EssayCreateDto essays, String userId) {
        if (essays.getTitle().isEmpty() || essays.getTitle() == null) {
            throw new IllegalArgumentException("제목은 필수 입니다.");
        }
        Member member1 = memberRepository.findByUserId(userId).get();
        Essay essay = Essay.builder()
                .title(essays.getTitle())
                .member(member1)
                .build();
        essayRepository.save(essay);
        for (EssayDetailCreateDto essayDetailDto : essays.getEssayDetails()) {
            EssayDetail essayDetail = EssayDetail.builder()
                    .question(essayDetailDto.getQuestion())
                    .answer(essayDetailDto.getAnswer())
                    .essay(essay)
                    .build();
            essayDetailRepository.save(essayDetail);
        }
    }

    @Override
    public Optional<Essay> findById(Long id) {
        return essayRepository.findById(id);
    }

    @Override
    @Transactional
    public void deleteByEssayId(Long id) {
        // Essay ID 가 id 인 EssayDetail
        // EssayDetail ID 가 essay_detail_id 인 FeedBack
        // 삭제 삭제 삭제
        // FeedBack 삭제 > Essay_detail 삭제 > Essay 삭제
        Optional<Essay> essay = essayRepository.findById(id);
        if (essay.isPresent()) {
            essayDetailRepository.deleteEssayDetailByEssayId(essay.get()); // essayDetail 삭제 끝
            essayRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("존재하지 않는 Essay입니다.");
        }
    }
}
