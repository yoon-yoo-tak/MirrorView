package com.mirrorview.domain.friend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.mirrorview.domain.user.domain.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "from_member_id")
	private Member from;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "to_member_id")
	private Member to;

	@Column(name = "is_connected", nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isConnected;

	public void acceptFriend() {
		this.isConnected = true;
	}
}
