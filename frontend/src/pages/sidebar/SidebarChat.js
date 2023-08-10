import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";

import ChatList from "pages/sidebar/ChatList";
import ChatRoom from "pages/sidebar/ChatRoom";
import ChatMyList from "pages/sidebar/ChatMyList";

import axios from "axios"; // <-- axios 불러오기

import { useDispatch } from "react-redux"; // <-- useDispatch 불러오기
import {
  initializeWebSocket,
  closeWebSocket,
  getClient,
  subscribeUserCount,
  subscribeChatRoomCreate,
  subscribeUserChatRooms,
} from "store/WebSocketStore"; // <-- WebSocket 액션 불러오기
import { loadChatRooms, subscribeRoomCountAsync } from "store/ChatRoomStore"; // loadRoom
import ChatModal from "pages/sidebar/ChatModal"; // <-- 추가
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/SideBar.css";

const SidebarChat = ({ setClickChat, clickChat }) => {
  const view = useSelector((state) => state.chatView.view); // 채팅 component 변경
  const dispatch = useDispatch(); // <-- dispatch 함수 가져오기
  const webSocketState = useSelector((state) => state.webSocket);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);
  const userCount = useSelector((state) => state.webSocket.userCount);
  const [isOpen, setIsOpen] = useState(false);

  const [isChatsContentVisible, setChatsContentVisible] = useState(true);
  const [chatContent, setChatContent] = useState("myChat");
  const chatsContentRef = useRef(null);
  const [chatsContentHeight, setChatsContentHeight] = useState("auto");

  const [showCreateChatModal, setShowCreateChatModal] = useState(false);

  // 모달 기능
  const handleOpenCreateChatModal = () => {
    setShowCreateChatModal(true);
  };

  const handleCloseCreateChatModal = () => {
    setShowCreateChatModal(false);
  };

  useEffect(() => {
    // 만약 state.auth가 null이면, 사이드바를 닫는다.
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (clickChat) {
      setIsOpen(true);
      
      dispatch(initializeWebSocket(accessToken)).then(() => {
        const client = getClient();
        dispatch(subscribeUserCount(client));
        dispatch(subscribeUserChatRooms(client));
        dispatch(subscribeChatRoomCreate(client));
        dispatch(subscribeRoomCountAsync());
      });

      // 유저를 redis에 등록함
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/chat/find`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.data.status === "ok") {
            console.log("유저를 redis에 등록함");
          }
        } catch (error) {
          console.error("유저 데이터 가져오기 실패:", error);
        }
      };
      fetchUserData();
    } else {
      setIsOpen(false); // 사이드바를 닫습니다.
      dispatch(closeWebSocket()); // WebSocket 연결을 종료합니다.
    }
  }, [clickChat]);

  // 채팅 기능
  function renderChatContent() {
    switch (chatContent) {
      case "openChat":
        return <ChatList />;
      case "myChat":
        return <ChatMyList />;
      default:
        return null;
    }
  }

  const handleChatContentChange = (content) => {
    setChatContent(content);
    if (content === "myChat" || content === "openChat") {
      dispatch(switchView("ChatList"));
    } else {
      dispatch(switchView("ChatRoom"));
    }
  };

  // chatContent 변경에 따른 데이터 로딩
  useEffect(() => {
    if (chatContent === "openChat") {
      dispatch(loadChatRooms());
    } else if (chatContent === "myChat") {
      dispatch(loadChatRooms()); // 이부분을 나중에loadMyChatRooms로 변경해야 한다.
    }
  }, [chatContent]);

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-section">
          <div className="section-title">
            <h2>채팅</h2>
            <div className="count">접속 인원: {userCount}</div>
          </div>
          <div className="underline"></div>
          <div
            className={`section-content ${
              isChatsContentVisible ? "" : "collapsed"
            }`}
            style={{
              maxHeight: isChatsContentVisible ? "none" : chatsContentHeight,
            }}
            ref={chatsContentRef}>
            <div className="nav-btn">
              <button onClick={() => handleChatContentChange("myChat")}>
                내 채팅
              </button>
              <button onClick={() => handleChatContentChange("openChat")}>
                오픈 채팅
              </button>
            </div>

            <div>
              {view === "ChatList" && renderChatContent()}
              {view === "ChatRoom" && <ChatRoom />}
            </div>

            <div className="chatbtn" onClick={handleOpenCreateChatModal}>
              채팅방 개설하기 <FaPlus className="icon" />
            </div>
            {showCreateChatModal && ( // <-- 추가
              <ChatModal
                isOpen={showCreateChatModal}
                onClose={handleCloseCreateChatModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
