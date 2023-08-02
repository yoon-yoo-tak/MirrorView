package com.mirrorview.domain.essay.service;

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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EssayServiceImpl implements EssayService {

    private final EssayRepository essayRepository;
    private final MemberRepository memberRepository;
    private final EssayDetailRepository essayDetailRepository;
    private final FeedbackRepository feedbackRepository;

    @Override
    public List<EssayDto> findEssayByUserId(String userId) {
        return essayRepository.findEssayByUserId(userId);
    }

    @Override
    public void insertEssayAndEssayDetails(EssayCreateDto essays, String userId) {
        Member member1 = memberRepository.findByUserId(userId);
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
            for (EssayDetail essayDetail : essay.get().getEssayDetails()) {
                feedbackRepository.deleteFeedbacksByEssayDetailId(essayDetail); // Feedback 삭제 끝
            }
            essayDetailRepository.deleteEssayDetailByEssayId(essay.get()); // essayDetail 삭제 끝
            essayRepository.deleteById(id);
        }
    }
}
