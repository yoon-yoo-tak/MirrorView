package com.mirrorview.domain.feedback.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.repository.EssayDetailRepository;
import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.dto.FeedbackSaveDto;
import com.mirrorview.domain.feedback.repository.FeedbackRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;
	private final EssayDetailRepository essayDetailRepository;
	private final MemberRepository memberRepository;

	@Override
	public List<FeedbackDto> findFeedbackByUserId(String userId) {
		return feedbackRepository.findFeedbackByUserId(userId);
	}

	@Override
	public List<FeedbackDto> findFeedbackByRoomId(Long roomId) {
		return feedbackRepository.findFeedbackByRoomId(roomId);
	}

	@Override
	public FeedbackDto findFeedbackByFeedbackId(Long feedbackId) {
		return feedbackRepository.findFeedbackByFeedbackId(feedbackId);
	}

	@Override
	@Transactional
	public void deleteFeedbackByFeedbackId(Long feedbackId) {
		feedbackRepository.deleteFeedbackByFeedbackId(feedbackId);
	}

	@Override
	public void saveFeedback(FeedbackSaveDto dto) {
		Optional<EssayDetail> essayDetail = essayDetailRepository.findById(dto.getEssayDetailId());
		Optional<Member> member = memberRepository.findById(dto.getUserId());
		if (essayDetail.isPresent() && member.isPresent()) {
			Feedback feedback = Feedback.builder()
				.content(dto.getContent())
				.roomId(dto.getRoomId())
				.essayDetail(essayDetail.get())
				.writer(member.get())
				.build();
			feedbackRepository.save(feedback);
		}
	}

}
