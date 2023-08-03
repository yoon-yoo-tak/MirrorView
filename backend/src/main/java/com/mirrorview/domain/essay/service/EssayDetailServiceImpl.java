package com.mirrorview.domain.essay.service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayDetailUpdateDto;
import com.mirrorview.domain.essay.dto.EssayUpdateDto;
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
public class EssayDetailServiceImpl implements EssayDetailService {

    private final EssayDetailRepository essayDetailRepository;
    private final EssayRepository essayRepository;
    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;

    @Override
    public List<EssayDetailDto> findEssayByEssayId(Long essayId) {
        return essayDetailRepository.findEssayByEssayId(essayId);
    }

    @Override
    @Transactional
    public void updateEssayDetails(EssayUpdateDto essayUpdateDto, String userId) {
        Long id = essayUpdateDto.getId();
        Optional<Essay> essay = essayRepository.findById(id); // 영속성 부여
        List<EssayDetailUpdateDto> list = essayUpdateDto.getEssayDetails();
        if (essay.isPresent()) {
            for (EssayDetailUpdateDto dto : list) {
                Long essay_detail_id = dto.getId();
                if (dto.getId() == 0) { // id 가 0이다 == 새로 추가된 항목
                    EssayDetail essayDetail = EssayDetail.builder()
                            .question(dto.getQuestion())
                            .answer(dto.getAnswer())
                            .essay(essay.get())
                            .build();
                    essayDetailRepository.save(essayDetail);
                }
                Optional<EssayDetail> essayDetail = essayDetailRepository.findById(essay_detail_id);
                if (dto.getIsDeleted()) { // isDeleted == true다 >> 삭제될 항목
                    Member member = memberRepository.findByUserId(userId).get();
                    feedbackRepository.deleteFeedbackByEssayDetailIdAndUserId(essayDetail.get(), member);
                    essayDetailRepository.deleteById(essay_detail_id);
                } else {  // 내용 업데이트
                    essayDetail.ifPresent(detail -> detail.updateQnA(dto.getQuestion(), dto.getAnswer()));
                }
            }
        }
    }
}
