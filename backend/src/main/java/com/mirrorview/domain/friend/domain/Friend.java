package com.mirrorview.domain.friend.domain;

import com.mirrorview.domain.user.domain.Member;
import lombok.*;

import javax.persistence.*;

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
