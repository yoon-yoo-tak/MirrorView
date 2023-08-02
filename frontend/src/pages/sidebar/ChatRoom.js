import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { getClient } from "store/WebSocketStore";

import "pages/sidebar/css/ChatRoom.css";

function getUserIdColor(userId) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

function ChatRoom() {
  const { user } = useSelector((state) => state.auth);
  const roomId = useSelector((state) => state.chatRoom.selectedRoom);

  const chatContainerRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  // 이전 채팅
  const getPreviousChats = () => {
    const client = getClient();
    client.send(`/app/chatrooms/${roomId}`);
  };

  // 채팅 보내기
  const sendMessage = () => {
    const client = getClient();
    client.send(
      `/app/chatrooms.send/${roomId}`,
      {},
      JSON.stringify({ userId: user.nickname, message })
    );
    setMessage("");
  };

  useEffect(() => {
    getPreviousChats();

    const client = getClient();
    console.log("선택방 ", roomId);
    const historySubscription = client.subscribe(
      `/user/sub/chatrooms/${roomId}`, // 이전 채팅 기록을 가져오는 엔드포인트
      (message) => {
        if (message.body) {
          const newMessages = JSON.parse(message.body);
          setChatMessages(newMessages);
        }
      }
    );

    // 다른 유저의 채팅
    const subscription = client.subscribe(
      `/sub/chatrooms/${roomId}`, // 신규 채팅 메시지를 가져오는 엔드포인트
      (message) => {
        if (message.body) {
          console.log(message.body);
          const newMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
          console.log(chatMessages);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      historySubscription.unsubscribe();
    };
  }, [roomId]);

  // 채팅방 화면 가장 아래로
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-room-container">
      <div className="header">
        <div className="back-button-container">
          <button className="back-button">
            <MdArrowBack size={24} />
          </button>
        </div>
        <h2 className="chat-title">{roomId}</h2>
        <div className="back-button-container" />
      </div>
      <div className="chat-container" ref={chatContainerRef}>
        {chatMessages.map((chatMessage, index) => (
          <div className="chat-message-container" key={index}>
            <p
              className="chat-user-id"
              style={{ color: getUserIdColor(chatMessage.userId) }}
            >
              <strong>{chatMessage.userId}</strong>
            </p>
            <p className="chat-message">{chatMessage.message}</p>
            <span className="chat-time">
              {new Date(chatMessage.timestamp).getHours()}:
              {new Date(chatMessage.timestamp).getMinutes()}
            </span>
          </div>
        ))}
      </div>
      <div className="input-button-container">
        <input
          className="chatInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;