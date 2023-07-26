package com.mirrorview.domain.chatroom.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
public class SseEmitterController {

	public String testEmitter() throws IOException {
		SseEmitter sseEmitter = new SseEmitter(60000L);
		sseEmitter.send(new String("hello"));
		return "";
	}

}
