import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "store/InterviewWebSocketStore"; // 경로 수정 필요
import {
    InterviewChatContainer,
    InterviewChatWindow,
    InterviewChatInputContainer,
    InterviewMessageInput,
    InterviewSendButton,
    Hidden,
} from "cha/StudyRoomChatStyleComponent";
import { WebSocketContext } from "WebSocketContext";

// !! 면접 시작 이후 채팅 comp

const USER_COLORS = [
    "#0F4C81", // Classic Blue
    "#FF6B6B", // Coral
    "#6B5B95", // Ultra Violet
    "#67D5B5", // Mint Green
    "#FF8080", // Living Coral
    "#FF9F89", // Rose Gold
    "#FFD1DC", // Millennial Pink
    "#A0E7E5", // Neo Mint
    "#FF4500", // Lush Lava Red
    "#FFD700", // Golden Yellow
    "#40E0D0", // Turquoise
    "#50C878", // Emerald Green
    "#E6E6FA", // Lavender
    "#B2BEB5", // Ash Gray
    "#228B22", // Forest Green
];

const getUserColor = (userId) => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % USER_COLORS.length;
    return USER_COLORS[index];
};

const ChattingSection = () => {
    const { client } = useContext(WebSocketContext);
    const chatWindowRef = useRef(null);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const { user } = useSelector((state) => state.auth);
    const interviewRoomId = useSelector(
        (state) => state.interviewWebSocket.currentRoom.id
    );
    const messages = useSelector(
        (state) => state.interviewWebSocket.currentRoom.messages
    );

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendClick();
        }
    };

    const handleSendClick = () => {
        if (message.trim() === "") return;

        const messageToSend = {
            type: "CHAT",
            data: {
                memberId: user.nickname,
                message: message.trim(),
            },
        };

        dispatch(
            sendMessage({
                client: client,
                roomId: interviewRoomId,
                data: messageToSend,
            })
        );
        setMessage("");
    };

    useEffect(() => {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }, [messages]);

    return (
        <div>
            <Hidden>채팅</Hidden>
            <InterviewChatContainer>
                <InterviewChatWindow ref={chatWindowRef}>
                    {messages &&
                        messages.map((msg, index) => (
                            <div key={index}>
                                {msg.type === "SYSTEM" ? (
                                    <span style={{ color: "#e63c71" }}>
                                        [SYSTEM] {msg.data.message}
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            color: getUserColor(
                                                msg.data.memberId
                                            ),
                                        }}
                                    >
                                        {msg.data.memberId}: {msg.data.message}
                                    </span>
                                )}
                            </div>
                        ))}
                </InterviewChatWindow>
                <InterviewChatInputContainer>
                    <InterviewMessageInput
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <InterviewSendButton onClick={handleSendClick}>
                        보내기
                    </InterviewSendButton>
                </InterviewChatInputContainer>
            </InterviewChatContainer>
        </div>
    );
};

export default ChattingSection;
