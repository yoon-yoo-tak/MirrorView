package com.mirrorview.global.config;

import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
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
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    // @Override
    // public void registerStompEndpoints(StompEndpointRegistry registry) {
    //     registry.addEndpoint("/api/ws").setAllowedOriginPatterns("*")
    //             .setHandshakeHandler(new DefaultHandshakeHandler() {
    //                 @Override
    //                 protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
    //                                                   Map<String, Object> attributes) {
    //                     String token = request.getURI().getQuery().split("=")[1];
    //                     if (JwtTokenUtil.validateToken(token)) {
    //                         String username = JwtTokenUtil.getUsernameFromToken(token);
    //                         return new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
    //                     } else {
    //                         return null;
    //                     }
    //                 }
    //             })
    //             .withSockJS();
    // }

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
                        Authentication authentication =
                            new UsernamePasswordAuthenticationToken(customMemberDetails, null, customMemberDetails.getAuthorities());
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
