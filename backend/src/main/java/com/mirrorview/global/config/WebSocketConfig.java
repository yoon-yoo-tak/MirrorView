package com.mirrorview.global.config;

import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ws").setAllowedOriginPatterns("*")
            .setHandshakeHandler(new DefaultHandshakeHandler() {
                @Override
                protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                    Map<String, Object> attributes) {
                    String token = request.getURI().getQuery().split("=")[1];
                    if (jwtTokenUtil.validateToken(token)) {
                        String username = jwtTokenUtil.getUsernameFromToken(token);
                        CustomMemberDetails customMemberDetails = (CustomMemberDetails) userDetailsService.loadUserByUsername(username);

                        // 유저를 닉네임으로 구분해서 사용할거임
                        // 닉네임으로 구분하면 웹 소켓 중복 유저는 발생하지 않는다.
                        Authentication authentication =
                            new UsernamePasswordAuthenticationToken(customMemberDetails.getUser().getNickname(), null, customMemberDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        return authentication;
                    } else {
                        return null;
                    }
                }
            })
            .withSockJS();
    }


    // 클라 -> 서버 pub
    // 서버 -> 클라 sub (구독)

    // 클라 -> 서버 -> 클라
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
