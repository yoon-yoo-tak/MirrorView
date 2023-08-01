import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";

import { switchView } from "store/ChatViewStore";
import { sendChat } from "store/ChatLogStore";

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
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chatLog.chatHistory);
  const roomId = useSelector((state) => state.chatRoom.selectedRoom);
  const {user} = useSelector((state)=> state.auth)
  const chatContainerRef = useRef(null); // <-- 추가된 부분

  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    console.log("send chat ", user.nickname)
    const nickname = user.nickname;
    dispatch(sendChat({ roomId, message, nickname }));
    setMessage("");
  };

  const setChatContent = () => {
    dispatch(switchView("ChatList"));
  };

  // 새 메시지가 추가될 때마다 채팅 창을 아래로 스크롤합니다.
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-room-container">
      <div className="header">
        <div className="back-button-container">
          <button
            className="back-button"
            onClick={() => setChatContent("myChat")}
          >
            <MdArrowBack size={24} />
          </button>
        </div>
        <h2 className="chat-title">{roomId}</h2>
        <div className="back-button-container" />
      </div>
      <div className="chat-container" ref={chatContainerRef}>
        {chatMessages.map((message, index) => (
          <div className="chat-message-container" key={index}>
            <p
              className="chat-user-id"
              style={{ color: getUserIdColor(message.userId) }}
            >
              <strong>{message.userId}</strong>
            </p>
            <p className="chat-message">{message.message}</p>
            <span className="chat-time">
              {new Date(message.timestamp).getHours()}:
              {new Date(message.timestamp).getMinutes()}
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
        <button className="sendButton" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
