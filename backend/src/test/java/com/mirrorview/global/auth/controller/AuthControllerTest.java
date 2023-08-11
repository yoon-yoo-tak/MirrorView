package com.mirrorview.global.auth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mirrorview.config.AbstractRestDocsTests;
import com.mirrorview.domain.admin.service.ReportService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.LoginDto;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.util.JwtTokenUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.data.redis.DataRedisTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@DisplayName("인증")
class AuthControllerTest extends AbstractRestDocsTests {

    @MockBean
    private MemberService memberService;
    @MockBean
    private RedisTemplate<String, String> mockedTemplate;
    //    @MockBean
//    private JwtTokenUtil jwtTokenUtil;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @Test
    @DisplayName("로그인")
    void logIn() throws Exception {
        LoginDto loginDto = new LoginDto("tester", "1234");
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Member member = Member.builder()
                .userId("tester")
                .username("kim")
                .nickname("kim")
                .email("sd@sd.sd")
                .delete(false)
                .password(passwordEncoder.encode("1234"))
                .build();

        when(memberService.findByUserId(anyString())).thenReturn(Optional.ofNullable(member));

        String jsonString = null;
        try {
            jsonString = objectMapper.writeValueAsString(loginDto);
            System.out.println(jsonString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonString))
                .andExpect(status().isOk());
//        verify(mockedTemplate, times(1)).opsForValue();

    }

    @Test
    public void testLoginSuccess() throws Exception {
        String userId = "testUser";
        String password = "password";


        Member member = Member.builder()
                .userId("testUser")
                .username("kim")
                .nickname("kim")
                .email("sd@sd.sd")
                .delete(false)
                .password(passwordEncoder.encode("password"))
                .build();

        LoginDto loginDto = new LoginDto();
        loginDto.setUserId(userId);
        loginDto.setPassword(password);

        // Define behavior of the mock objects
        when(memberService.findByUserId(userId)).thenReturn(Optional.of(member));
        when(passwordEncoder.matches(password, member.getPassword())).thenReturn(true);

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access-token").exists())
                .andExpect(jsonPath("$.refresh-token").exists());

        // Verify interactions with the mock objects
//        verify(memberService, times(1)).findByUserId(userId);
//        verify(passwordEncoder, times(1)).matches(password, member.getPassword());
        // Add similar verification for other interactions if needed
    }

//    @Test
//    @DisplayName("액세스 토큰 재발급")
//    void reissueAccessToken() {
//    }
}