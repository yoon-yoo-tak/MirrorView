import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "store/InterviewWebSocketStore"; // 경로 수정 필요
import {
  ChatContainer,
  ChatWindow,
  ChatInputContainer,
  MessageInput,
  SendButton,
} from "cha/StudyRoomChatStyleComponent";

const StudyChatting = () => {
  const chatWindowRef = useRef(null);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const interviewRoomId = useSelector((state) => state.interview.currentRoom.id);
  const messages = useSelector(
    (state) => state.interviewWebSocket.currentRoom.messages
  );

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick(); // 엔터 키를 누르면 handleSendClick 함수 호출
    }
  };

  const handleSendClick = () => {
    if (message.trim() === "") return; // 빈 메시지 무시

    const messageToSend = {
      type: "CHAT",
      roomId: interviewRoomId,
      data: {
        memberId: user.nickname,
        message: message.trim(),
      },
    };

    dispatch(sendMessage(messageToSend)); // 액션 디스패치
    setMessage("");
  };

  // 채팅 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]); // messages가 변경될 때마다 실행

  return (
    <ChatContainer>
      <ChatWindow ref={chatWindowRef}> {/* 참조 추가 */}
        {messages &&
          messages.map((msg, index) => (
            <div key={index}>
              {msg.type === "SYSTEM" ? (
                <span style={{ color: "#6A9CFD" }}>
                  [SYSTEM] {msg.data.message} {/* SYSTEM 메시지 수정 */}
                </span>
              ) : (
                <>
                  <span style={{ color: "#6A9CFD" }}>
                    {msg.data.memberId}:  {/* SYSTEM 메시지 수정 */}
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
