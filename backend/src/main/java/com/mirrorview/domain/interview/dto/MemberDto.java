package com.mirrorview.domain.interview.dto;

import org.checkerframework.checker.units.qual.A;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MemberDto {
	private String nickname;
	private boolean ready;
	private String role;
	private float rating;
}
