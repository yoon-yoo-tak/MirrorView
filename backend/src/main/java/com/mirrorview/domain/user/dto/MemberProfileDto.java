package com.mirrorview.domain.user.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class MemberProfileDto {
    private String userId;
    private String nickname;
    private Boolean isOauthUser;
    private String email;
    private String photo;
    private String roles;
    private float averageRating;
}
