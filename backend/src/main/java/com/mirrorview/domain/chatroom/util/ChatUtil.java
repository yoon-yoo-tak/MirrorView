package com.mirrorview.domain.chatroom.util;

import org.springframework.stereotype.Component;

@Component
public class ChatUtil {

    public String oneToOne(String userAid, String userBid) {
        if (userAid.compareTo(userBid) < 0) {
            return userAid + "-" + userBid;
        } else
            return userBid + "-" + userAid;
    }
}
