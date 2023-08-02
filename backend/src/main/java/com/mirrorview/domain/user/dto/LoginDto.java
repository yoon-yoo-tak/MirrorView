package com.mirrorview.domain.user.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class LoginDto {
    String userId;
    String password;
}
