package com.mirrorview.domain.essay.service;

import com.mirrorview.domain.essay.domain.Essay;

public interface EssayService {
	Essay findByMemberId(Long id);
}
