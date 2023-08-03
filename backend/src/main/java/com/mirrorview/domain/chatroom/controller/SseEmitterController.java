package com.mirrorview.domain.chatroom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Controller
public class SseEmitterController {

    public String testEmitter() throws IOException {
        SseEmitter sseEmitter = new SseEmitter(60000L);
        sseEmitter.send("hello");
        return "";
    }

}
