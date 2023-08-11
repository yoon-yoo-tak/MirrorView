package com.mirrorview.domain.friend.repository;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.friend.dto.FriendDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.mirrorview.domain.friend.domain.QFriend.friend;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FriendRepositoryCustomImpl implements FriendRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<FriendDto> findFriendsByUserId(String userId) {
        BooleanExpression isToMe = friend.to.userId.eq(userId).and(friend.isConnected.isTrue());
        BooleanExpression isFromMe = friend.from.userId.eq(userId).and(friend.isConnected.isTrue());

        List<FriendDto> friends = jpaQueryFactory
                .select(Projections.constructor(FriendDto.class,
                        new CaseBuilder()
                                .when(isToMe).then(friend.from.id)
                                .otherwise(friend.to.id),
                        new CaseBuilder()
                                .when(isToMe).then(friend.from.userId)
                                .otherwise(friend.to.userId),
                        new CaseBuilder()
                                .when(isToMe).then(friend.from.nickname)
                                .otherwise(friend.to.nickname)))
                .from(friend)
                .where(isToMe.or(isFromMe))
                .fetch();

        return friends;
    }

    @Override
    public List<FriendDto> findFriendRequestsByUserId(String userId) {
        List<FriendDto> friendRequests = jpaQueryFactory
                .select(Projections.constructor(FriendDto.class,
                        friend.from.id, friend.from.userId, friend.from.nickname))
                .from(friend)
                .join(friend.from)
                .where(friend.to.userId.eq(userId)
                        .and(friend.isConnected.isFalse()))
                .fetch();

        return friendRequests;
    }

    @Override
    public List<FriendDto> findSentFriendRequestsByUserId(String userId) {
        List<FriendDto> friendSentRequests = jpaQueryFactory
                .select(Projections.constructor(FriendDto.class,
                        friend.to.id, friend.to.userId, friend.to.nickname))
                .from(friend)
                .join(friend.to)
                .where(friend.from.userId.eq(userId)
                        .and(friend.isConnected.isFalse()))
                .fetch();

        return friendSentRequests;
    }

    @Override
    public String findFriendStatusByUserIds(String myUserId, String otherUserId) {
        BooleanExpression subQuery = (friend.from.userId.eq(myUserId).and(friend.to.userId.eq(otherUserId)))
                .or((friend.from.userId.eq(otherUserId).and(friend.to.userId.eq(myUserId))));

        String friendStatus = jpaQueryFactory
                .select(new CaseBuilder()
                        .when((friend.isConnected.isFalse()).and(friend.from.userId.eq(myUserId))).then("wait")
                        .when((friend.isConnected.isFalse()).and(friend.to.userId.eq(myUserId))).then("receive")
                        .when((friend.isConnected.isTrue())).then("connect")
                        .otherwise("none"))
                .from(friend)
                .where(subQuery)
                .fetchFirst();

        if (friendStatus == null) {
            return "none";
        }
        return friendStatus;
    }

    @Override
    public Optional<Friend> findByUserIds(String myUserId, String otherUserId) {
        BooleanExpression subQuery = (friend.from.userId.eq(myUserId).and(friend.to.userId.eq(otherUserId)))
                .or((friend.from.userId.eq(otherUserId).and(friend.to.userId.eq(myUserId))));

        Friend findFriend = jpaQueryFactory
                .select(Projections.constructor(Friend.class, friend.id, friend.from, friend.to,
                        friend.isConnected))
                .from(friend)
                .where(subQuery)
                .fetchFirst();

        return Optional.ofNullable(findFriend);
    }
}
