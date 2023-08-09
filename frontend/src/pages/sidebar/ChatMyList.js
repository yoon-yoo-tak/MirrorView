import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRocketchat } from "react-icons/fa";
import axios from "axios";  // axios 불러오기

import { updateSelectedRoom } from "store/ChatRoomStore";
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/ChatList.css";

function ChatMyList() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // chatRooms의 초기 상태를 빈 배열로 설정
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // API 호출용 함수
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`/api/chat/favorites`);
        const rooms = response.data.data;  // API 응답 구조에 따라 약간 수정이 필요할 수 있습니다.
        console.log(rooms, " 내 즐겨찾기 방들")
        setChatRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleJoinChat = (title) => {
    dispatch(updateSelectedRoom(title));
    dispatch(switchView("ChatRoom")); // view를 ChatRoom으로 변경
  };

  return (
    <div className="chat-room-list">
        {chatRooms.map((chatRoom) => (
            <div className="chat-room-item" key={chatRoom.id}>
                {/* <div className="chat-room-title">
                    <FaRocketchat className="icon" />{" "}
                    <p>
                        {chatRoom.id} / 참여인원: {chatRoom.count}
                    </p>
                </div>
                <button
                    className="join-button"
                    onClick={() => {
                        handleJoinChat(chatRoom.id);
                    }}
                >
                    입장
                </button> */}
                {/*  */}
                <div className="chatContent">
                    <div className="chatTitle">{chatRoom.id}</div>
                    <div className="chatCount">
                        {chatRoom.count}명 참여 중
                    </div>
                </div>
                <div
                    className="join-button"
                    onClick={() => {
                        handleJoinChat(chatRoom.id);
                    }}
                >
                    입장
                </div>
            </div>
        ))}
    </div>
);
}

export default ChatMyList;
