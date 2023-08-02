package com.mirrorview.domain.essay.domain;

import com.mirrorview.domain.user.domain.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Essay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    @OneToMany(mappedBy = "essay")
    private List<EssayDetail> essayDetails = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    public void updateEssayDetail(List<EssayDetail> essayDetails) {
        this.essayDetails = List.copyOf(essayDetails);
    }
}
