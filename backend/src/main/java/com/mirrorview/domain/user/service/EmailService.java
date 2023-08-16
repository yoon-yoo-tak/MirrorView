package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.Member;

public interface EmailService {
    boolean sendEmail(String email);

    boolean checkKey(String email, String key);

    void checkEmail(String email);

    void sendEmail(Member member);

    void sendPasswordEmail(Member member);
}
