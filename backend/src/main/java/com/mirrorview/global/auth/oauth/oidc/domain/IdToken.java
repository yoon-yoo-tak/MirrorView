package com.mirrorview.global.auth.oauth.oidc.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class IdToken {
    private String iss;
    private String aud;
    private String sub;
    private String iat;
    private String exp;
}
