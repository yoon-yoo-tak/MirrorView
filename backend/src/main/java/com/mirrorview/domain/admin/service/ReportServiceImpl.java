package com.mirrorview.domain.admin.service;

import java.util.Optional;

import com.mirrorview.domain.admin.domain.Report;
import com.mirrorview.domain.admin.dto.ReportRequestDto;
import com.mirrorview.domain.admin.repository.ReportRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final MemberRepository memberRepository;

    @Override
    public void reportMember(String userId, ReportRequestDto requestDto) {

        Optional<Member> member = memberRepository.findByUserId(userId);
        Optional<Member> otherMember = memberRepository.findByUserId(requestDto.getOtherUserId());
        if (member.isEmpty() || otherMember.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }
        Report report = requestDto.toEntity(member.get(), otherMember.get());
        reportRepository.save(report);
    }
}
