import React, { useState } from "react";
import { useDispatch } from "react-redux"; // import useDispatch
import { createChatRoomAsync } from "store/ChatRoomStore"; // import createChatRoomAsync action

import "pages/sidebar/css/ChatModal.css";

const ChatModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch(); // use useDispatch to create a dispatch function

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = () => {
        dispatch(createChatRoomAsync(title)); // dispatch the createChatRoomAsync action with the title as payload
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
