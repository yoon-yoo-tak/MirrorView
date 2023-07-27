package com.mirrorview.domain.essay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.dto.EssayCreateDto;
import com.mirrorview.domain.essay.dto.EssayDetailCreateDto;
import com.mirrorview.domain.essay.dto.EssayDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.essay.repository.EssayRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EssayServiceImpl implements EssayService {

	private final EssayRepository essayRepository;
	private final MemberRepository memberRepository;
	private final EssayDetailRepository essayDetailRepository;

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
}
