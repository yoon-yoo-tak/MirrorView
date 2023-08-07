package com.mirrorview.domain.essay.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mirrorview.domain.essay.domain.EssayDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EssayDetailUpdateDto {
    private Long id;
    private String question;
    private String answer;
    private Boolean isDeleted;

    public EssayDetail toEntity() {
        return EssayDetail.builder()
                .question(question)
                .answer(answer)
                .build();
    }
}
