package com.mirrorview.domain.feedback.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.dto.FeedbackListDto;
import com.mirrorview.domain.feedback.dto.FeedbackSaveDto;
import com.mirrorview.domain.feedback.repository.FeedbackRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;
	private final MemberRepository memberRepository;

	@Override
	public List<FeedbackListDto> findFeedbackByUserId(String userId) {
		Optional<Member> member = memberRepository.findByUserId(userId);
		return member.map(value -> feedbackRepository.findByReceiver(value)
			.stream()
			.map(FeedbackListDto::toDto)
			.collect(Collectors.toList())).orElse(null);
	}

	@Override
	public void saveFeedback(FeedbackSaveDto dto, String senderId) {
		log.info("dto = {}", dto);
		Optional<Member> member = memberRepository.findByNickname(dto.getReceiver());
		Optional<Member> sender = memberRepository.findByUserId(senderId);
		if (member.isPresent() && sender.isPresent()) {
			feedbackRepository.save(Feedback.builder()
				.roomId(dto.getRoomId())
				.receiver(member.get())
				.content(dto.getContent())
				.roomTitle(dto.getRoomTitle())
				.sender(sender.get())
				.build());
		} else {
			throw new IllegalArgumentException("존재하지않는 사용자 입니다.");
		}
	}

	@Override
	public void deleteByRoomId(String roomId) {
		feedbackRepository.deleteByRoomId(roomId);
	}

	@Override
	public List<FeedbackDto> findFeedbackByRoomId(String roomId) {
		return feedbackRepository.findByRoomId(roomId)
			.stream()
			.map(FeedbackDto::toDto)
			.collect(Collectors.toList());
	}
}
