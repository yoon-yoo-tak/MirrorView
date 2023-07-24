package com.mirrorview.domain.essay.service;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.repository.EssayRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EssayServiceImpl implements EssayService {

	private final EssayRepository essayRepository;

	@Override
	public Essay findByMemberId(Long memberId) {
		return essayRepository.findByMemberId(memberId);
	}
}
