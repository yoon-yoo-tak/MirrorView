package com.mirrorview.domain.user.domain;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "member")
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

	private String roles;

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

	public void updateEmail(String email) {
		this.email = email;
	}

	public void updateAverageScore(long count, float score) {
		float allScore = averageRating * (count - 1) + score;
		averageRating = allScore / count;
	}

	public List<String> getRoleList() {
		if (this.roles.length() > 0) {
			return Arrays.asList(this.roles.split(","));
		}
		return new ArrayList<>();
	}

	public void delete() {
		delete = true;
	}
}
