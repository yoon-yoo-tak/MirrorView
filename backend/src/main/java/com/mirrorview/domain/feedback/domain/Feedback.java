package com.mirrorview.domain.feedback.domain;

import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.user.domain.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_title")
    private String roomTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver")
    private Member receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender")
    private Member sender;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
