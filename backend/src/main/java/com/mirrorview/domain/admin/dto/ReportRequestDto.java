package com.mirrorview.domain.admin.dto;

import com.mirrorview.domain.admin.domain.Report;
import com.mirrorview.domain.user.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportRequestDto {

    private String content;
    private String otherUserId;

    public Report toEntity(Member member, Member otherMember) {
        return Report
                .builder()
                .content(this.content)
                .reporter(member)
                .reported(otherMember)
                .build();
    }
}
