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
      <h2>Create a Chat Room</h2>
      <input
        type="text"
        placeholder="Room title"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleSubmit}>Create Room</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ChatModal;
