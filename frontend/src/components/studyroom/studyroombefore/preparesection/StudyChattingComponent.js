import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "store/InterviewWebSocketStore"; // 경로 수정 필요
import { WebSocketContext } from "WebSocketContext";
import {
  ChatContainer,
  ChatWindow,
  ChatInputContainer,
  MessageInput,
  SendButton,
} from "cha/StudyRoomChatStyleComponent";
import Swal from "sweetalert2";
const USER_COLORS = [
  "#0F4C81", // Classic Blue
  "#FF6B6B", // Coral
  "#6B5B95", // Ultra Violet
  "#67D5B5", // Mint Green
  "#FF8080", // Living Coral
  "#FF9F89", // Rose Gold
  "#FFD1DC", // Millennial Pink
  "#A0E7E5", // Neo Mint
  "#FF4500", // Lush Lava Red
  "#FFD700", // Golden Yellow
  "#40E0D0", // Turquoise
  "#50C878", // Emerald Green
  "#E6E6FA", // Lavender
  "#B2BEB5", // Ash Gray
  "#228B22", // Forest Green
];

const getUserColor = (userId) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % USER_COLORS.length;
  return USER_COLORS[index];
};

const StudyChatting = () => {
  const { client } = useContext(WebSocketContext);
  const chatWindowRef = useRef(null);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const interviewRoomId = useSelector(
    (state) => state.interviewWebSocket.currentRoom.id
  );
  const messages = useSelector(
    (state) => state.interviewWebSocket.currentRoom.messages
  );

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendClick(); // 엔터 키를 누르면 handleSendClick 함수 호출
    }
  };

  const handleSendClick = () => {
    if (message.trim() === "") return; // 빈 메시지 무시

    if (message.length > 250) {
      Swal.fire({
        title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">메시지는 250자 이하 입력 가능합니다.<div>',
        icon: "error", width: 330
      });
      setMessage("");
      return;
    }

    const messageToSend = {
      type: "CHAT",
      data: {
        memberId: user.nickname,
        message: message.trim(),
      },
    };

    dispatch(
      sendMessage({
        client: client,
        roomId: interviewRoomId,
        data: messageToSend,
      })
    );
    setMessage("");
  };

  // 채팅 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]); // messages가 변경될 때마다 실행

  return (
    <ChatContainer>
      <ChatWindow ref={chatWindowRef}>
        {" "}
        {/* 참조 추가 */}
        {messages &&
          messages.map((msg, index) => (
            <div key={index}>
              {msg.type === "SYSTEM" ? (
                <span style={{ color: "#e63c71" }}>
                  {" "}
                  {/* SYSTEM 메시지 */}
                  [SYSTEM] {msg.data.message}
                </span>
              ) : (
                <>
                  <span style={{ color: getUserColor(msg.data.memberId) }}>
                    {msg.data.memberId}: {/* USER 메시지 */}
                    {msg.data.message}
                  </span>
                </>
              )}
            </div>
          ))}
      </ChatWindow>
      <ChatInputContainer>
        <MessageInput
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <SendButton onClick={handleSendClick}>보내기</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default StudyChatting;
