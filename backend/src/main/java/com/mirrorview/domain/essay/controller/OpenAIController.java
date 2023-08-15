package com.mirrorview.domain.essay.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mirrorview.domain.essay.dto.GptRequestDto;
import com.mirrorview.domain.essay.dto.GptResponseDto;
import com.mirrorview.global.util.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class OpenAIController {
    private static final String GPT_URL = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;
    private final HttpHeaders headers;

    @Autowired
    public OpenAIController(@Value("${gpt.key}") String key) {
        this.restTemplate = new RestTemplate();
        this.headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(JwtTokenUtil.HEADER_STRING, JwtTokenUtil.TOKEN_PREFIX + key);
    }

    @PostMapping("/api/createQuestions")
    public ResponseEntity<?> createQuestionsBasedOnIntro(@RequestBody Map<String, String> body) {
        log.info("AI 질문 Generate!");
        try {
            String introduction = body.get("introduction");
            String job = body.get("job");

            StringBuilder prompt = new StringBuilder();
            prompt.append("지원 직무 : ").append(job).append("\n")
                    .append("- 자기소개서 시작").append("\n")
                    .append(introduction).append("\n")
                    .append("- 자기소개서 끝").append("\n")
                    .append("위 자기소개서를 기반으로 질문을 4개 만들어주고 직무 관련된 질문을 1개 만들어서 총 5개의 질문을 생성해줘");

            Map<String, String> gptMessage = new LinkedHashMap<>();
            gptMessage.put("role", "system");
            gptMessage.put("content", "너는 유명한 기업의 면접관이야 전달받은 자기소개서를 기반으로 질문을 4개 만들어주고"
                + " 직무 관련된 질문을 1개 만들어서 총 5개의 질문을 생성해줘"
                + " 항상 아래와 같은 형식을 맞추어서 대답해줘 "
                + "1. (질문1)\n"
                + "2. (질문2)\n"
                + "3. (질문3)\n"
                + "4. (질문4)\n"
                + "5. (질문5)");

            Map<String, String> userMessage = new LinkedHashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt.toString());
            GptRequestDto gptRequestDto = GptRequestDto.builder()
                    .model("gpt-3.5-turbo")
                    .messages(List.of(gptMessage, userMessage))
                    .build();

            ObjectMapper objectMapper = new ObjectMapper();
            String requestBody = objectMapper.writeValueAsString(gptRequestDto);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    GPT_URL,
                    HttpMethod.POST,
                    entity,
                    String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("GPT Response 200");
                GptResponseDto gptResponseDto = objectMapper.readValue(response.getBody(), GptResponseDto.class);
                log.info("자소서 = {}", gptResponseDto.getContent());
                return new ResponseEntity<>(gptResponseDto.getContent(), HttpStatus.OK);
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
