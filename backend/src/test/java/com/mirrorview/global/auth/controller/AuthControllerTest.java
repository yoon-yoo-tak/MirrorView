//package com.mirrorview.global.auth.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.mirrorview.config.AbstractRestDocsTests;
//import com.mirrorview.domain.user.domain.Member;
//import com.mirrorview.domain.user.dto.LoginDto;
//import com.mirrorview.domain.user.service.MemberService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest
//@DisplayName("인증")
//class AuthControllerTest extends AbstractRestDocsTests {
//
//    @MockBean
//    private MemberService memberService;
//
//
//    @Test
//    @DisplayName("로그인")
//    void logIn() throws Exception {
//        LoginDto loginDto = new LoginDto("tester", "1234");
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        Member member = Member.builder()
//                .userId("tester")
//                .username("kim")
//                .nickname("kim")
//                .email("sd@sd.sd")
//                .password(passwordEncoder.encode("1234"))
//                .build();
//
//        when(memberService.findByUserId(anyString())).thenAnswer(invocation -> {
//            String userId = invocation.getArgument(0);
//            if (userId.equals(loginDto.getUserId())) {
//                return Optional.of(member);
//            } else {
//                return Optional.empty();
//            }
//        });
//        String jsonString = null;
//        try {
//            jsonString = objectMapper.writeValueAsString(loginDto);
//            System.out.println(jsonString);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        mockMvc.perform(post("/api/users/login")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(jsonString))
//                .andExpect();
//
//    }
//
////    @Test
////    @DisplayName("액세스 토큰 재발급")
////    void reissueAccessToken() {
////    }
//}