import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRocketchat } from "react-icons/fa";

import { loadChatRooms, updateSelectedRoom } from "store/ChatRoomStore";
import { switchView } from "store/ChatViewStore";
import axios from "axios"; // 추가

import "pages/sidebar/css/ChatList.css";

function ChatList() {
  const dispatch = useDispatch();
  const chatRooms = useSelector((state) => state.chatRoom.chatRooms);
  const { user } = useSelector((state) => state.auth);
  const sortedChatRooms = [...chatRooms].sort((a, b) => b.count - a.count);

  useEffect(() => {
    dispatch(loadChatRooms());
  }, [dispatch]);

  const handleJoinChat = (title) => {
    dispatch(updateSelectedRoom(title));
    dispatch(switchView("ChatRoom")); // view를 ChatRoom으로 변경
  };
  const handleAddToFavorites = (roomId) => {
    console.log(user.userId, " ", roomId);
    axios
      .post(`/api/chat/favorites/${roomId}`) // user id와 room id를 사용하여 요청
      .then((response) => {
        console.log(response.data);
        // 여기서 필요한 추가적인 로직이 있다면 구현하세요. 예를 들면, 알림 메시지 표시 등
      })
      .catch((error) => {
        console.error("즐겨찾기 추가 중 오류 발생:", error);
      });
  };
  return (
    <div className="chat-room-list">
      {sortedChatRooms.map((chatRoom) => (
        <div className="chat-room-item" key={chatRoom.id}>
          {/*  */}
          <div className="chatContent">
            <div className="chatTitle">{chatRoom.id}</div>
            <div className="chatCount">{chatRoom.count}명 참여 중</div>
          </div>

          {/* 수정해줘 */}
          <div
            className="join-button"
            onClick={() => {
              handleAddToFavorites(chatRoom.id);
            }}>
            즐찾
          </div>
          <div
            className="join-button"
            onClick={() => {
              handleJoinChat(chatRoom.id);
            }}>
            입장
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
