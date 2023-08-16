package com.mirrorview.domain.essay.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "essay_detail")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class EssayDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "essay_id")
    private Essay essay;

    private String question;

    private String answer;

    public void updateQnA(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

}
