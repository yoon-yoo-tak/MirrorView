package com.mirrorview.domain.essay.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mirrorview.domain.essay.dto.GptRequestDto;
import com.mirrorview.domain.essay.dto.GptResponseDto;
import com.mirrorview.global.util.JwtTokenUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class OpenAIController {
    private static final String GPT_URL = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;
    private final HttpHeaders headers;

    @Autowired
    public OpenAIController(@Value("${gpt.key}") String key) {
        this.restTemplate = new RestTemplate();
        // restTemplate.getMessageConverters()
        //         .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        // restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

        this.headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(JwtTokenUtil.HEADER_STRING, JwtTokenUtil.TOKEN_PREFIX + key);
    }

    @PostMapping("/api/createQuestions")
    public ResponseEntity<List<String>> createQuestionsBasedOnIntro(@RequestBody Map<String, String> body) {
        try {
            String introduction = body.get("introduction");
            String job = body.get("job");

            String prompt = "지원 직무 : " + job + "\n"
                + "자기소개서 시작 \n" + introduction + "\n 끝";

            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> gptMessage = new LinkedHashMap<>();
            gptMessage.put("role", "system");
            gptMessage.put("content", "너는 유명한 기업의 면접관이야 전달받은 자기소개서를 기반으로 질문을 5개 만들어줘");
            Map<String, String> userMessage = new LinkedHashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);
            GptRequestDto gptRequestDto = GptRequestDto.builder()
                .model("gpt-3.5-turbo")
                .messages(List.of(gptMessage, userMessage))
                .build();
            log.info("gptdto = {}", gptRequestDto);

            ObjectMapper objectMapper = new ObjectMapper();
            String requestBody = objectMapper.writeValueAsString(gptRequestDto);
            log.info("req body = {}", requestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            log.info("entity = {}", entity);
            log.info("요청 보낸다!");
            ResponseEntity<String> response = restTemplate.exchange(
                "https://api.openai.com/v1/chat/completions",
                HttpMethod.POST,
                entity,
                String.class);
            log.info("response = {}", response);
            log.info("response code = {}", response.getStatusCode());

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("200!!!!!!!!!!!!!!!!!!!!!");
                ObjectMapper mapper = new ObjectMapper();
                GptResponseDto gptResponseDto = objectMapper.readValue(response.getBody(), GptResponseDto.class);
                return new ResponseEntity<>(List.of(gptResponseDto.getContent()), HttpStatus.OK);
            } else {
                log.info("Server Error");
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.info("exception = {}", e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
