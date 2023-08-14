package com.mirrorview.domain.user.dto;

import com.mirrorview.domain.user.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResDto {

    private String friendStatus;
    private String nickname;
    private float score;
    private String email;
    private String photo;
    private String userId;

    public static MemberResDto build(String friendStatus, Member findMember) {
        return MemberResDto.builder()
                .photo(findMember.getPhoto())
                .friendStatus(friendStatus)
                .userId(findMember.getUserId())
                .nickname(findMember.getNickname())
                .score(findMember.getAverageRating())
                .email(findMember.getEmail())
                .build();
    }
}
