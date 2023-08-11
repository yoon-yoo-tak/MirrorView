import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRocketchat } from "react-icons/fa";
import axios from "axios";

import { updateSelectedRoom } from "store/ChatRoomStore";
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/ChatList.css";

function ChatMyList() {
    const { user } = useSelector((state) => state.auth);
    const realTimeChatRooms = useSelector((state) => state.chatRoom.chatRooms);
    const dispatch = useDispatch();

    const [myChatRooms, setMyChatRooms] = useState([]);

    useEffect(() => {
        const fetchMyChatRooms = async () => {
            try {
                const response = await axios.get(`/api/chat/favorites`);
                const fetchedRooms = response.data.data;
                updateWithRealTimeData(fetchedRooms);
            } catch (error) {
                console.error("Failed to fetch chat rooms:", error);
            }
        };

        const updateWithRealTimeData = (fetchedRooms) => {
            const updatedRooms = fetchedRooms.map((room) => {
                const realTimeRoom = realTimeChatRooms.find(
                    (rtRoom) => rtRoom.id === room.id
                );
                return realTimeRoom || room;
            });
            updatedRooms.sort((a, b) => b.count - a.count);
            setMyChatRooms(updatedRooms);
        };

        fetchMyChatRooms();
    }, [realTimeChatRooms]);

    const handleJoinChat = (title) => {
        dispatch(updateSelectedRoom({ title }));
        dispatch(switchView("ChatRoom"));
    };


    return (
        <div className="chat-room-list">
            {myChatRooms.map((chatRoom) => (
                <div className="chat-room-item" key={chatRoom.id}>
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
