package com.mirrorview.domain.admin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.mirrorview.domain.admin.domain.Report;
import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.admin.dto.ReportRequestDto;
import com.mirrorview.domain.admin.repository.ReportRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
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

    @Override
    public Page<ReportListDto> getList(Pageable pageable) {
        return reportRepository.reportList(pageable);
    }

    @Override
    public List<ReportDetailDto> getContent(String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자"));
        return reportRepository.reportContent(member);
    }

    @Override
    public void banMember(String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자"));
        member.delete();
    }
}
