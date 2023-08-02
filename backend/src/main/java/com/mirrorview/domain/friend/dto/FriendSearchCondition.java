package com.mirrorview.domain.friend.dto;

import com.mirrorview.domain.user.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FriendSearchCondition {

    private Member member;
    private Integer pageNumber;
    private Integer offsetNumber;
}
