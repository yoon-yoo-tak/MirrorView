import star from "../../assets/Star-full.png";
import star_empty from "../../assets/Star-empty.png";
import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRocketchat } from "react-icons/fa";
import { WebSocketContext } from "WebSocketContext";

import { loadChatRooms, updateSelectedRoom } from "store/ChatRoomStore";
import { switchView } from "store/ChatViewStore";
import axios from "axios"; // 추가

import "pages/sidebar/css/ChatList.css";

function ChatList() {
  const dispatch = useDispatch();
  const { client } = useContext(WebSocketContext);
  const chatRooms = useSelector((state) => state.chatRoom.chatRooms);
  const { user } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState({});
  const sortedChatRooms = [...chatRooms].sort((a, b) => b.count - a.count);

  useEffect(() => {
    dispatch(loadChatRooms(client));
  }, [dispatch]);

  const handleJoinChat = (title) => {
    dispatch(updateSelectedRoom({ title }));
    dispatch(switchView("ChatRoom")); // view를 ChatRoom으로 변경
  };
  const handleAddToFavorites = (roomId) => {
    console.log(user.userId, " ", roomId);
    if (window.confirm("즐겨찾기에 추가할까요?")) {
      axios
        .post(`/api/chat/favorites/${roomId}`) // user id와 room id를 사용하여 요청
        .then((response) => {
          console.log(response.data);
          setIsFavorite((prev) => ({ ...prev, [roomId]: true }));
        })
        .catch((error) => {
          console.error("즐겨찾기 추가 중 오류 발생:", error);
          alert("이미 등록한 방입니다.");
        });
    }
  };

  const handleDeleteFavorites = (roomId) => {
    if (window.confirm("즐겨찾기를 취소할까요?")) {
      axios
        .delete(`/api/chat/favorites/${roomId}`)
        .then((response) => {
          console.log(response.data);
          setIsFavorite((prev) => ({ ...prev, [roomId]: false }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const checkMyChatRooms = async () => {
      try {
        const response = await axios.get(`/api/chat/favorites`);
        const fetchedRooms = response.data.data;

        const favoriteStatus = {};
        fetchedRooms.forEach((room) => {
          favoriteStatus[room.id.toString()] = true;
        });
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error(error);
      }
    };

    checkMyChatRooms();
  }, [chatRooms]);

  return (
    <div className="chat-room-list">
      {sortedChatRooms.map((chatRoom) => (
        <div className="chat-room-item" key={chatRoom.id}>
          {/*  */}
          <div className="chatContent">
            <div className="chatTitle">{chatRoom.id}</div>
            <div className="chatCount">{chatRoom.count}명 참여 중</div>
          </div>

          {isFavorite[chatRoom.id.toString()] ? (
            <img
              className="is-favorite"
              src={star}
              onClick={() => {
                handleDeleteFavorites(chatRoom.id);
              }}
              alt="full"
            />
          ) : (
            <img
              className="is-favorite"
              src={star_empty}
              onClick={() => {
                handleAddToFavorites(chatRoom.id);
              }}
              alt="empty"
            />
          )}
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
