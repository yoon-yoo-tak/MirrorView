package com.mirrorview.domain.notice.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.mirrorview.domain.notice.dto.BoardModifyDto;
import com.mirrorview.domain.notice.dto.BoardWriteDto;
import com.mirrorview.domain.user.domain.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	private String title;

	private String content;

	@CreationTimestamp
	private LocalDateTime createdTime;

	public void update(BoardModifyDto dto){
		this.title = dto.getTitle();
		this.content = dto.getContent();
	}
}
