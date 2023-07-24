package com.mirrorview.domain.essay.service;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EssayDetailServiceImpl implements EssayDetailService {

	private final EssayDetailRepository essayDetailRepository;

	@Override
	public EssayDetail findByEssayId(Long essayId) {
		return essayDetailRepository.findByEssayId(essayId);
	}
}
