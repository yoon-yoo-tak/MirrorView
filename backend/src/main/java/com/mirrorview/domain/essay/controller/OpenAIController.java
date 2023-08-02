package com.mirrorview.domain.essay.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class OpenAIController {

    private final RestTemplate restTemplate;
    private final HttpHeaders headers;

    public OpenAIController() {
        this.restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

        this.headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + "your-api-key"); // key
    }

    @PostMapping("/api/createQuestions")
    public ResponseEntity<List<String>> createQuestionsBasedOnIntro(@RequestBody Map<String, String> body) {
        try {
            String introduction = body.get("introduction");
            String job = body.get("job");
            String prompt = introduction + "\n직무: " + job + "\n\n이 정보에 기반한 질문 5개:\n1. ";
            String requestBody = "{ \"model\": \"gpt-4.0-turbo\", \"prompt\": \"" + prompt + "\", \"max_tokens\": 250 }";

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://api.openai.com/v1/engines/gpt-4.0-turbo/completions",
                    HttpMethod.POST,
                    entity,
                    String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode rootNode = mapper.readTree(response.getBody());
                JsonNode choicesNode = rootNode.path("choices");
                JsonNode textNode = choicesNode.get(0).path("text");
                String generatedText = textNode.asText();

                List<String> questions = Arrays.asList(generatedText.split("\n"));
                return new ResponseEntity<>(questions, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
