import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { WebSocketContext } from "WebSocketContext";
import sendIcon from "../../assets/send.png";
import TextField from "@mui/material/TextField";

import "pages/sidebar/css/ChatRoom.css";
import { switchView } from "store/ChatViewStore";
import { setPrivateRoom } from "store/GlobalStore";

function ChatPrivate() {
  const { client } = useContext(WebSocketContext);
  const { user } = useSelector((state) => state.auth);
  const rooms = useSelector((state) => state.global.privateRooms);
  const dispatch = useDispatch();

  const deleteRoom = ({ roomId, toUser, fromUser }) => {
    const messageData = {
      type: "DELETE_PRIVATE_ROOM",
      data: {
        roomId: roomId,
        toUser: toUser,
        fromUser: fromUser,
      },
    };

    client.send(`/app/global.one`, {}, JSON.stringify(messageData));
  };

  useEffect(() => {
    const message = {
      type: "GET_PRIVATE_ROOMS",
      data: {},
    };

    client.send("/app/global.one", {}, JSON.stringify(message));
  }, []);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const handleJoinPrivateChat = (roomInfo) => {
    dispatch(setPrivateRoom(roomInfo));
    dispatch(switchView("privateRoom"));
  };

  return (
    <div className="chat-room-list">
      {rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <div className="chat-room-item" key={room.id}>
            <div className="chatContent">
              {user.nickname !== room.sender && (
                <div className="chatTitle">{room.sender}님과의 채팅</div>
              )}
              {user.nickname === room.sender && (
                <div className="chatTitle">{room.receiver}님과의 채팅</div>
              )}
              {/* Add more room details if you have them */}
            </div>
            <div
              className="join-button"
              onClick={() =>
                deleteRoom({
                  roomId: room.id,
                  toUser:
                    user.nickname !== room.sender ? room.sender : room.receiver,
                  fromUser:
                    user.nickname !== room.sender ? room.receiver : room.sender,
                })
              }>
              삭제
            </div>
            <div
              className="join-button"
              onClick={() =>
                handleJoinPrivateChat({
                  roomId: room.id,
                  toUser:
                    user.nickname !== room.sender ? room.sender : room.receiver,
                })
              }>
              입장
            </div>
          </div>
        ))
      ) : (
        <p>개인 채팅이 없습니다.</p>
      )}
    </div>
  );
}

export default ChatPrivate;
