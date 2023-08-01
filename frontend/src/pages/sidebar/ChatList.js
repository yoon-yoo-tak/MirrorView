import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRocketchat } from "react-icons/fa";

import { loadChatRooms,updateSelectedRoom } from "store/ChatRoomStore";
import { fetchChatHistory } from "store/ChatLogStore";
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/ChatList.css";

function ChatList() {
  const dispatch = useDispatch();
  const chatRooms = useSelector((state) => state.chatRoom.chatRooms);

  useEffect(() => {
    dispatch(loadChatRooms());
  }, [dispatch]);

  const handleChatRoom = (title) => {
    dispatch(fetchChatHistory(title));
  };

  const handleJoinChat = (title) => {
    dispatch(switchView("ChatRoom")); // view를 ChatRoom으로 변경
    dispatch(updateSelectedRoom(title));
  };

  return (
    <div className="chat-room-list">
      {chatRooms.map((chatRoom) => (
        <div className="chat-room-item" key={chatRoom.id}>
          <div className="chat-room-title">
            <FaRocketchat className="icon" /> <p>{chatRoom.id}</p>
          </div>
          <button
            className="join-button"
            onClick={() => {
              handleChatRoom(chatRoom.id);
              handleJoinChat(chatRoom.id);
            }}
          >
            입장
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
