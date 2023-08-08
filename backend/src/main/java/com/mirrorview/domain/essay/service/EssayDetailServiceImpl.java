package com.mirrorview.domain.essay.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.dto.EssayDetailCreateDto;
import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.dto.EssayUpdateDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.essay.repository.EssayRepository;
import com.mirrorview.domain.feedback.repository.FeedbackRepository;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
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
		Essay essay = essayRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("ID에 해당하는 자소서가 없습니다."));// 영속성 부여
		List<EssayDetailCreateDto> list = essayUpdateDto.getEssayDetails();
		List<EssayDetail> toChange = essay.getEssayDetails();
		toChange.clear();
		for (EssayDetailCreateDto essayDetailCreateDto : list) {
			toChange.add(EssayDetail.builder()
				.essay(essay)
				.question(essayDetailCreateDto.getQuestion())
				.answer(essayDetailCreateDto.getAnswer())
				.build());
		}
        essay.updateTitle(essayUpdateDto.getTitle());
		// for (EssayDetailUpdateDto dto : list) {
		//     log.info("update Dto = {}", dto);
		//     Long essay_detail_id = dto.getId();
		//     if (dto.getId() == 0) { // id 가 0이다 == 새로 추가된 항목
		//         EssayDetail essayDetail = EssayDetail.builder()
		//             .question(dto.getQuestion())
		//             .answer(dto.getAnswer())
		//             .essay(essay.get())
		//             .build();
		//         essayDetailRepository.save(essayDetail);
		//     }
		//     Optional<EssayDetail> essayDetail = essayDetailRepository.findById(essay_detail_id);
		//     if (dto.getIsDeleted()) { // isDeleted == true다 >> 삭제될 항목
		//         // Member member = memberRepository.findByUserId(userId).get();
		//         // feedbackRepository.deleteFeedbackByEssayDetailIdAndUserId(essayDetail.get(), member);
		//         essayDetailRepository.deleteById(essay_detail_id);
		//     } else {  // 내용 업데이트
		//         essayDetail.ifPresent(detail -> detail.updateQnA(dto.getQuestion(), dto.getAnswer()));
		//     }
		// }
	}
}
