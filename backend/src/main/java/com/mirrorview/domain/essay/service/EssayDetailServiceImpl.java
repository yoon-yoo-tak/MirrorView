package com.mirrorview.domain.essay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.dto.EssayDetailDto;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EssayDetailServiceImpl implements EssayDetailService {

	private final EssayDetailRepository essayDetailRepository;

	@Override
	public List<EssayDetailDto> findEssayByEssayId(Long essayId){
		return essayDetailRepository.findEssayByEssayId(essayId);
	}
}
