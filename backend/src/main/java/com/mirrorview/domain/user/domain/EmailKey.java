package com.mirrorview.domain.user.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "email_key")
@Builder
public class EmailKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "code")
    private String key;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean checked;

    public void check() {
        this.checked = true;
    }
}
