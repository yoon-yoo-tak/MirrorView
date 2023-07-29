package com.mirrorview.domain.user.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "userid")
	private String userId;

	private String username;

	private String password;

	private String nickname;

	private String email;

	private String photo;

	private float averageRating;

	@Column(name = "delete_member", nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean delete;

	public void updatePhoto(String updatePhoto) {
		this.photo = updatePhoto;
	}

	public void updateNickName(String nickname) {
		this.nickname = nickname;
	}

	public void updatePassword(String password) {
		this.password = password;
	}

	public void updateAverageScore(long count, float score) {
		float allScore = averageRating * (count-1) + score;
		averageRating = allScore / count;
	}

	public void delete() {
		delete = true;
	}
}
