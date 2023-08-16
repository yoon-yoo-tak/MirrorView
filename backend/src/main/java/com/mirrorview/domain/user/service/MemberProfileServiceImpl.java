package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.ChangePasswordDto;
import com.mirrorview.domain.user.dto.MemberProfileDto;
import com.mirrorview.domain.user.repository.MemberProfileRepository;
import com.mirrorview.domain.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberProfileServiceImpl implements MemberProfileService {

    private final MemberProfileRepository memberProfileRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updatePhoto(String userId, String photo) {
        Member member = memberProfileRepository.findByUserId(userId);
        member.updatePhoto(photo);
    }

    @Override
    public void updateNickname(String userId, String nickname) {
        if (nickname.equals("")) {
            throw new IllegalArgumentException("닉네임은 비어있을 수 없습니다.");
        }
        Optional<Member> findMember = memberProfileRepository.findByNickname(nickname);
        if (findMember.isPresent()) { // nickName을 가진 유저가 존재
            throw new IllegalArgumentException("이미 존재하는 닉네임");
        }
        Member member = memberProfileRepository.findByUserId(userId);
        member.updateNickname(nickname);

    }

    @Override
    public MemberProfileDto findByUserId(String userId) {
        Member member = memberProfileRepository.findByUserId(userId);
        MemberProfileDto memberProfileDto = new MemberProfileDto();
        memberProfileDto.setUserId(member.getUserId());
        memberProfileDto.setIsOauthUser(member.getIsOauthUser());
        memberProfileDto.setEmail(member.getEmail());
        memberProfileDto.setNickname(member.getNickname());
        memberProfileDto.setPhoto(member.getPhoto());
        memberProfileDto.setRoles(member.getRoles().replace("ROLE_", ""));
        memberProfileDto.setAverageRating(member.getAverageRating());
        return memberProfileDto;
    }

    @Override
    public void changePassword(ChangePasswordDto dto, String userId) {
        String origin = dto.getOriginPass();
        if (!dto.getNewPass().equals(dto.getCheckNewPass())) {
            throw new RuntimeException("비밀번호 재확인이 틀렸습니다.");
        }

        Member members = memberRepository.findByUserId(userId).get();
        if (passwordEncoder.matches(dto.getNewPass(), members.getPassword())) {
            throw new RuntimeException("같은 비밀번호로 수정할 수 없습니다.");
        } else if (passwordEncoder.matches(origin, members.getPassword())) {
            members.updatePassword(passwordEncoder.encode(dto.getNewPass()));
        } else {
            throw new RuntimeException("비밀번호가 틀렸습니다");
        }
    }

    @Override
    public void changeEmail(String email, String userId) {
        Member members = memberRepository.findByUserId(userId).get();
        members.updateEmail(email);
    }
}
