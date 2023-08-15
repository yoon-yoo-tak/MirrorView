import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { WebSocketContext } from "WebSocketContext";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // useEffect(() => {
  //   // if (!user) {
  //   //   navigate("/");
  //   // }
  //   // if (!client) {
  //   //   navigate("/");
  //   // }
  // }, [user, navigate, client]); // useEffect 의존성 배열에 user와 navigate를 추가

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
    if (client && client.connected) {
      const message = {
        type: "GET_PRIVATE_ROOMS",
        data: {},
      };
      client.send("/app/global.one", {}, JSON.stringify(message));
    }
  }, [client]);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  const handleJoinPrivateChat = (roomInfo) => {
    dispatch(setPrivateRoom(roomInfo));
    dispatch(switchView("privateRoom"));
  };

  return (
    <div className="chat-room-list">
      {user && rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <div className="chat-room-item" key={room.id}>
            <div className="chatContent">
              {user.nickname !== room.sender && (
                <div className="chatTitle">{room.sender}님과의 채팅</div>
              )}
              {user.nickname === room.sender && (
                <div className="chatTitle">{room.receiver}님과의 채팅</div>
              )}
            </div>
            <div className="button-group">
              <div
                className="join-button"
                onClick={() =>
                  deleteRoom({
                    roomId: room.id,
                    toUser:
                      user.nickname !== room.sender
                        ? room.sender
                        : room.receiver,
                    fromUser:
                      user.nickname !== room.sender
                        ? room.receiver
                        : room.sender,
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
                      user.nickname !== room.sender
                        ? room.sender
                        : room.receiver,
                  })
                }>
                입장
              </div>
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
