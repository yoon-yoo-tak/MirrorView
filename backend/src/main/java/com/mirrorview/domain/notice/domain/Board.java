package com.mirrorview.domain.notice.domain;

import com.mirrorview.domain.notice.dto.BoardModifyDto;
import com.mirrorview.domain.user.domain.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    public void update(BoardModifyDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }
}
