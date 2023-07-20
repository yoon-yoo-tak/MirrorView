package com.mirrorview.domain.user.service;

import java.util.Optional;
import java.util.Random;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mirrorview.domain.user.domain.EmailKey;
import com.mirrorview.domain.user.repository.EmailKeyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender emailSender;
	private final EmailKeyRepository emailKeyRepository;

	@Override
	public boolean sendEmail(String email) {
		String key = createKey();
		try {
			MimeMessage message = createMessage(email, key);
			emailSender.send(message);

			EmailKey emailKey = EmailKey.builder()
				.email(email)
				.key(key)
				.checked(false)
				.build();

			saveEmailKey(emailKey);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	@Transactional
	public boolean checkKey(String email, String key) {
		Optional<EmailKey> findEmailKey = emailKeyRepository.findByEmailAndKey(email, key);
		if (findEmailKey.isPresent()) {
			findEmailKey.get().check();
			return true;
		}
		return false;
	}

	private void saveEmailKey(EmailKey emailKey) {
		Optional<EmailKey> findEmail = emailKeyRepository.findByEmail(emailKey.getEmail());
		findEmail.ifPresent(emailKeyRepository::delete);
		emailKeyRepository.save(emailKey);
	}

	private String createKey() {
		StringBuilder key = new StringBuilder();
		Random random = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = random.nextInt(3); // 0~2 까지 랜덤, random 값에 따라서 아래 switch 문이 실행됨

			if (index == 0) {
				key.append((char)(random.nextInt(26) + 97));
				// a~z (ex. 1+97=98 => (char)98 = 'b')
			}
			if (index == 1) {
				key.append((char)(random.nextInt(26) + 65));
				// A~Z
			}
			if (index == 2) {
				key.append((random.nextInt(10)));
				// 0~9
			}
		}

		return key.toString();
	}

	private MimeMessage createMessage(String email, String key) throws Exception {
		MimeMessage message = emailSender.createMimeMessage();
		final String subject = "Mirror View 이메일 인증";
		String msg = "<div style='border: 1px solid black; padding: 10px; font-family: verdana;'>";
		msg += "<h2>안녕하세요? 미러뷰 입니다.</h2>";
		msg += "<p>아래 인증 번호를 입력하시고 회원가입을 계속 진행해 주세요.</p>";
		msg += "<p>인증번호 : <span style='color: blue;'>" + key + "</span></p></div>";

		message.addRecipients(Message.RecipientType.TO, email);
		message.setSubject(subject);
		message.setText(msg, "utf-8", "html");
		message.setFrom(new InternetAddress("gsl0505@naver.com", "mirrorView"));

		return message;
	}

}
