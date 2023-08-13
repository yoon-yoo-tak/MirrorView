import React, { useState, useContext } from "react";
import { WebSocketContext } from "WebSocketContext";
import { useDispatch } from "react-redux"; // import useDispatch

import { createChatRoomAsync } from "store/ChatRoomStore"; // import createChatRoomAsync action

import "pages/sidebar/css/ChatModal.css";

const ChatModal = ({ isOpen, onClose }) => {
  const { client } = useContext(WebSocketContext);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (title.length > 24 || title.length < 3) {
      alert("방 제목은 3글자 이상, 24자 이하로 설정해주세요.");
      return; // 12자 이상일 때 함수종료
    }

    dispatch(createChatRoomAsync({ title, client }));
    setTitle(""); // reset the title
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="closeBtn" onClick={onClose}>
        닫기
      </div>
      <h2>채팅방 개설하기</h2>
      <input
        type="text"
        placeholder="채팅방의 이름을 입력하세요"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="createBtn" onClick={handleSubmit}>
        CREATE
      </div>
    </div>
  );
};

export default ChatModal;
