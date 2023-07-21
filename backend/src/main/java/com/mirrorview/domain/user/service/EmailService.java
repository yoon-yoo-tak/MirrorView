package com.mirrorview.domain.user.service;

public interface EmailService {
	boolean sendEmail(String email);

	boolean checkKey(String email, String key);

	void checkEmail(String email);
}
