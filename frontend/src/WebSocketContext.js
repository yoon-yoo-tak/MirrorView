import React, { useState, useEffect, useCallback, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { globalSubscribe, globalOneUserSubscribe } from "store/GlobalStore";
import {
  subscribeUserCount,
  subscribeChatRoomCreate,
  subscribeUserChatRooms,
} from "store/WebSocketStore"; // <-- WebSocket 액션 불러오기
import { loadChatRooms, subscribeRoomCountAsync } from "store/ChatRoomStore"; // loadRoom

export const WebSocketProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const initialDelay = 5000;

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const initializeWebSocket = useCallback(() => {
    if (!accessToken) {
      console.log("로그인 이후 웹소켓이 동작함");
      return;
    }

    const httpUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const urlWithToken = `${httpUrl}?token=${accessToken}`;
    const socket = new SockJS(urlWithToken);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      (frame) => {
        setClient(stompClient);
        setReconnectAttempts(0); // 성공적인 연결이 이루어지면 재연결 시도 횟수를 초기화합니다.

        // 친구요청 관련 sub
        dispatch(globalSubscribe(stompClient));

        // 채팅방 관련 sub
        dispatch(subscribeUserCount(stompClient));
        dispatch(subscribeUserChatRooms(stompClient));
        dispatch(subscribeChatRoomCreate(stompClient));
        dispatch(subscribeRoomCountAsync(stompClient));
        dispatch(globalOneUserSubscribe(stompClient));
      },
      (error) => {
        console.error("웹 소켓 에러 ", error);
        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = initialDelay * (reconnectAttempts + 1);
          setTimeout(() => {
            setReconnectAttempts((prev) => prev + 1);
          }, delay);
        } else {
          console.error("재연결 시도 초과");
        }
      }
    );

    // 연결이 종료될 때 처리
    stompClient.onclose = () => {
      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = initialDelay * (reconnectAttempts + 1);
        setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
        }, delay);
      }
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [reconnectAttempts, accessToken, dispatch]);

  useEffect(initializeWebSocket, [initializeWebSocket]);

  const value = {
    client,
    setClient,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const WebSocketContext = createContext();
