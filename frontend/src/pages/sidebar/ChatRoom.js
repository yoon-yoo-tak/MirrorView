import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { WebSocketContext } from "WebSocketContext";

import sendIcon from "../../assets/send.png";
import TextField from "@mui/material/TextField";

import "pages/sidebar/css/ChatRoom.css";
import { switchView } from "store/ChatViewStore";
import ProfileModal from "components/ProfileModal";

// 닉네임에 색주기
function getNicknameColor(userNickname) {
    let hash = 0;
    for (let i = 0; i < userNickname.length; i++) {
        hash = userNickname.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
}

function ChatRoom() {
    const { client } = useContext(WebSocketContext);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const roomId = useSelector((state) => state.chatRoom.selectedRoom);
    const selectedRoomCount = useSelector((state) => {
        const selectedRoom = state.chatRoom.chatRooms.find(
            (room) => room.id === roomId
        );
        return selectedRoom ? selectedRoom.count : null;
    });

    const chatContainerRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    // 모달 기능
    const goUserProfile = (nickname) => {
        if (nickname === user.nickname) {
            return;
        }
        setOpenProfileModal(true);
        setSelectedMember(nickname);
    };

    const closeUserProfile = () => {
        setOpenProfileModal(false);
    };

    // 이전 채팅 가져오기
    const getPreviousChats = () => {
        if (client == null) return;

        client.send(`/app/chatrooms/${roomId}`);
    };

    // 채팅 보내기
    const sendMessage = () => {
        if (!message.trim()) {
            alert("메시지를 입력하세요."); // 알림을 표시하거나 원하는 대응 로직을 넣을 수 있습니다.
            return;
        }

        client.send(
            `/app/chatrooms.send/${roomId}`,
            {},
            JSON.stringify({ userNickname: user.nickname, message })
        );
        setMessage("");
    };

    useEffect(() => {
        if (client == null) {
            return;
        }

        const historySubscription = client.subscribe(
            `/user/sub/chatrooms/${roomId}`, // 이전 채팅 기록을 가져오는 엔드포인트
            (message) => {
                if (message.body) {
                    const newMessages = JSON.parse(message.body);
                    setChatMessages(newMessages);
                }
            }
        );

        // 다른 유저의 채팅
        const subscription = client.subscribe(
            `/sub/chatrooms/${roomId}`, // 신규 채팅 메시지를 가져오는 엔드포인트
            (message) => {
                if (message.body) {
                    const newMessage = JSON.parse(message.body);
                    setChatMessages((prevMessages) => [
                        ...prevMessages,
                        newMessage,
                    ]);
                    //console.log(chatMessages);
                }
            }
        );
        new Promise((resolve) => setTimeout(resolve, 330));
        getPreviousChats();

        return () => {
            subscription.unsubscribe();
            historySubscription.unsubscribe();
        };
    }, [roomId]);

    // 채팅방 화면 가장 아래로
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatMessages]);

    return (
        <div className="chat-room-container">
            <div className="header">
                <div className="back-button-container">
                    <button
                        className="back-button"
                        onClick={() => dispatch(switchView("ChatList"))}
                    >
                        <MdArrowBack size={24} />
                    </button>
                </div>
                <div className="chat-title">
                    {roomId} ({selectedRoomCount} 명)
                </div>
                <div className="back-button-container" />
            </div>
            <div className="chat-container" ref={chatContainerRef}>
                {chatMessages.map((chatMessage, index) => (
                    <div key={index}>
                        {" "}
                        {/* Move the key prop here */}
                        <div
                            className="chat-user-id"
                            style={{
                                color: getNicknameColor(
                                    chatMessage.userNickname
                                ),
                            }}
                            onClick={() =>
                                goUserProfile(chatMessage.userNickname)
                            }
                        >
                            {chatMessage.userNickname}
                        </div>
                        <div className="chat-message-container">
                            <p className="chat-message">
                                {chatMessage.message}
                            </p>
                            <span className="chat-time">
                                {new Date(chatMessage.timestamp).getHours()}:
                                {new Date(chatMessage.timestamp).getMinutes()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-button-container">
                {/* <input
                    className="chatInput"
                    
                /> */}
                <TextField
                    id="standard-basic"
                    className="chatInput"
                    variant="standard"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {/* <button className="sendButton" onClick={sendMessage}>
                    Send
                </button> */}
                <img
                    src={sendIcon}
                    className="sendButton"
                    onClick={sendMessage}
                    alt="send"
                />
            </div>
            {openProfileModal && ( // <-- 추가
                <ProfileModal
                    nickname={selectedMember}
                    isOpen={openProfileModal}
                    onClose={closeUserProfile}
                />
            )}
        </div>
    );
}

export default ChatRoom;
