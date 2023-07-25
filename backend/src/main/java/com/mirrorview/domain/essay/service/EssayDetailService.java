package com.mirrorview.domain.essay.service;

import com.mirrorview.domain.essay.domain.EssayDetail;

public interface EssayDetailService {
	EssayDetail findByEssayId(Long essayId);
}
