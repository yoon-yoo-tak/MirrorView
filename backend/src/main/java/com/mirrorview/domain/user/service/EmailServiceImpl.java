package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.EmailKey;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.EmailKeyRepository;
import com.mirrorview.domain.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
@PropertySource(value = "classpath:email.properties")
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final EmailKeyRepository emailKeyRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    @Value("${spring.mail.username}")
    private String hostMail;

    @Override
    public boolean sendEmail(String email) {
        String key = createKey();
        try {
            MimeMessage message = createMessage(email, key);
            emailSender.send(message);

            EmailKey emailKey = EmailKey.builder().email(email).key(key).checked(false).build();

            saveEmailKey(emailKey);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    @Transactional
    public void sendEmail(Member member) {
        String newPassword = createKey();
        try {
            MimeMessage message = createMessage(member.getEmail(), newPassword);
            emailSender.send(message);
            member.updatePassword(passwordEncoder.encode(newPassword));
            memberRepository.save(member);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void sendPasswordEmail(Member member) {
        String newPassword = createKey();
        try {
            MimeMessage message = findPassword(member.getEmail(), newPassword);
            emailSender.send(message);
            member.updatePassword(passwordEncoder.encode(newPassword));
            memberRepository.save(member);
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    @Override
    public void checkEmail(String email) {
        Optional<EmailKey> findEmail = getByEmail(email);
        if (findEmail.isEmpty()) {
            throw new IllegalArgumentException("이메일을 다시 확인해 주세요");
        }
        EmailKey emailKey = findEmail.get();
        if (!emailKey.getChecked()) {
            throw new IllegalArgumentException("이메일 검증이 필요합니다.");
        }
    }

    private Optional<EmailKey> getByEmail(String email) {
        return emailKeyRepository.findByEmail(email);
    }

    private void saveEmailKey(EmailKey emailKey) {
        Optional<EmailKey> findEmail = getByEmail(emailKey.getEmail());
        findEmail.ifPresent(emailKeyRepository::delete);
        emailKeyRepository.save(emailKey);
    }

    private String createKey() {
        StringBuilder key = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = random.nextInt(3); // 0~2 까지 랜덤, random 값에 따라서 아래 switch 문이 실행됨

            if (index == 0) {
                key.append((char) (random.nextInt(26) + 97));
                // a~z (ex. 1+97=98 => (char)98 = 'b')
            }
            if (index == 1) {
                key.append((char) (random.nextInt(26) + 65));
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
        String msg = "<!DOCTYPE html>" + "<html>" + "<head>" + "<title>이메일 인증</title>" + "<style>" + "body {"
                + "font-family: 'Helvetica', Arial, sans-serif;" + "background-color: #f5f5f5;" + "display: flex;"
                + "justify-content: center;" + "align-items: center;" + "height: 100vh;" + "margin: 0;" + "}"
                + ".container {" + "max-width: 500px;" + "border: 2px solid #ccc;" + "border-radius: 8px;"
                + "background-color: #fff;" + "padding: 30px;" + "text-align: center;"
                + "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" + "}" + "h2 {" + "color: #333;" + "margin-bottom: 20px;" + "}"
                + ".verification {" + "color: #007bff;" + "font-size: 18px;" + "font-weight: bold;"
                + "border: 2px solid #007bff;" + "padding: 8px 16px;" + "border-radius: 8px;" + "}" + "p {"
                + "margin: 10px 0;" + "}" + ".note {" + "font-size: 12px;" + "color: #777;" + "}" + "</style>" + "</head>"
                + "<body>" + "<div class='container'>" + "<h2>안녕하세요? 미러뷰입니다.</h2>"
                + "<p>아래 인증 번호를 입력하시고 회원가입을 계속 진행해주세요.</p>" + "<p>인증번호: <span class='verification'>" + key + "</span></p>"
                + "<p class='note'>* 인증번호는 10분간 유효합니다.</p>" + "</div>" + "</body>" + "</html>";

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject(subject);
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress(hostMail+"@naver.com", "mirrorView"));

        return message;
    }

    private MimeMessage findPassword(String email, String key) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        final String subject = "Mirror View 임시 비밀번호 발급";
        String msg = "<!DOCTYPE html>" + "<html>" + "<head>" + "<title>임시 비밀번호입니다.</title>" + "<style>" + "body {"
            + "font-family: 'Helvetica', Arial, sans-serif;" + "background-color: #f5f5f5;" + "display: flex;"
            + "justify-content: center;" + "align-items: center;" + "height: 100vh;" + "margin: 0;" + "}"
            + ".container {" + "max-width: 500px;" + "border: 2px solid #ccc;" + "border-radius: 8px;"
            + "background-color: #fff;" + "padding: 30px;" + "text-align: center;"
            + "box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" + "}" + "h2 {" + "color: #333;" + "margin-bottom: 20px;" + "}"
            + ".verification {" + "color: #007bff;" + "font-size: 18px;" + "font-weight: bold;"
            + "border: 2px solid #007bff;" + "padding: 8px 16px;" + "border-radius: 8px;" + "}" + "p {"
            + "margin: 10px 0;" + "}" + ".note {" + "font-size: 12px;" + "color: #777;" + "}" + "</style>" + "</head>"
            + "<body>" + "<div class='container'>" + "<h2>안녕하세요? 미러뷰입니다.</h2>"
            + "<p>아래 임시 비밀번호를 입력하시고 로그인하신 후 비밀번호를 수정해주세요.</p>" + "<p>임시 비밀번호: <span class='verification'>" + key + "</span></p>"
             + "</div>" + "</body>" + "</html>";

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject(subject);
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress(hostMail+"@naver.com", "mirrorView"));

        return message;
    }


}
