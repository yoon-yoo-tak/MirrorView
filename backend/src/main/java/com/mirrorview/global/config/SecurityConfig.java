package com.mirrorview.global.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.jwt.CustomMemberDetailService;
import com.mirrorview.global.auth.jwt.JwtAuthenticationFilter;
import com.mirrorview.global.auth.jwt.RestAuthenticationEntryPoint;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

	private final MemberService memberService;
	private final CustomMemberDetailService customMemberDetailService;
	private final PasswordEncoder passwordEncoder;
	private final RedisTemplate<String, String> template;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
			.cors().configurationSource(corsConfigurationSource()).and()
			.csrf().disable()
			.httpBasic().disable()
			.formLogin().disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()

			.apply(new MyCustomDsl());

		http
			.authorizeRequests()
			.antMatchers("/api/users/login").permitAll() //로그인
			.antMatchers("/").permitAll() //로그인
			.antMatchers("/kauth.kakao.com/oauth/authorize/**").permitAll()
			.antMatchers("/api/users/**").permitAll() //회원 가입
			.antMatchers("/ws/**").permitAll()
			.anyRequest().authenticated();

		http
			.exceptionHandling()
			.authenticationEntryPoint(new RestAuthenticationEntryPoint()); // 그 외 모든 요청에 대해 인증 필요

		return http.build();
	}

	// DAO 기반으로 Authentication Provider를 생성
	// BCrypt Password Encoder와 UserDetailService 구현체를 설정
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
		daoAuthenticationProvider.setUserDetailsService(this.customMemberDetailService);
		return daoAuthenticationProvider;
	}

	@Bean // 위에는 비 권장될 수도
	@Order(0)
	public SecurityFilterChain resources(HttpSecurity http) throws Exception {
		return http.requestMatchers(matchers -> matchers.antMatchers("/favicon.ico",
				"/error",
				"/swagger-resources/**",
				"/swagger-ui/**",
				"/v3/api-docs",
				"/resources/**",
				"/webjars/**"))
			.authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
			.requestCache(RequestCacheConfigurer::disable)
			.securityContext(AbstractHttpConfigurer::disable)
			.sessionManagement(AbstractHttpConfigurer::disable).build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowCredentials(true); // 쿠키를 받을건지
		//configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
		configuration.addAllowedOriginPattern("*");
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));

		configuration.addAllowedHeader("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
		@Override
		public void configure(HttpSecurity http) throws Exception {
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
			http
				.addFilterBefore(new JwtAuthenticationFilter(authenticationManager, memberService, template),
					UsernamePasswordAuthenticationFilter.class);
		}
	}
}