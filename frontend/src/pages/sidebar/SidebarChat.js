import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { WebSocketContext } from "WebSocketContext";

import ChatList from "pages/sidebar/ChatList";
import ChatRoom from "pages/sidebar/ChatRoom";
import ChatMyList from "pages/sidebar/ChatMyList";
import ChatPrivate from "pages/sidebar/ChatPrivate";
import ChatPrivateRoom from "pages/sidebar/ChatPrivateRoom";
import axios from "axios"; // <-- axios 불러오기

import { useDispatch } from "react-redux"; // <-- useDispatch 불러오기
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
  const [chatContent, setChatContent] = useState("openChat");
  const chatsContentRef = useRef(null);
  const [chatsContentHeight, setChatsContentHeight] = useState("auto");

  const [showCreateChatModal, setShowCreateChatModal] = useState(false);

  const { client } = useContext(WebSocketContext);

  // 모달 기능
  const handleOpenCreateChatModal = () => {
    setShowCreateChatModal(true);
  };

  const handleCloseCreateChatModal = () => {
    setShowCreateChatModal(false);
  };

  // 만약 state.auth가 null이면, 사이드바를 닫는다.
  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (clickChat) {
      setIsOpen(true);

      // 유저를 redis에 등록함
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/chat/find`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.data.status === "ok") {
            //console.log("유저를 redis에 등록함");
          }
        } catch (error) {
          //console.error("유저 데이터 가져오기 실패:", error);
        }
      };
      fetchUserData();
    } else {
      setIsOpen(false); // 사이드바를 닫습니다.
    }
  }, [clickChat]);

  // 내부 컴포넌트
  function renderChatContent() {
    switch (chatContent) {
      case "openChat":
        return <ChatList />;
      case "myChat":
        return <ChatMyList />;
      case "privateChat": // <-- 여기 추가
        return <ChatPrivate />;
      default:
        return null;
    }
  }

  const handleChatContentChange = (content) => {
    setChatContent(content);
    if (
      content === "myChat" ||
      content === "openChat" ||
      content === "privateChat"
    ) {
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
      dispatch(loadChatRooms());
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
                즐겨 찾기
              </button>
              <button onClick={() => handleChatContentChange("openChat")}>
                오픈 채팅
              </button>
              <button
                onClick={() => {
                  handleChatContentChange("privateChat");

                  //dispatch(switchView("privateRoom"));

                }}>
                개인 채팅
              </button>
            </div>
            <div>
              {view === "ChatList" && renderChatContent()}
              {view === "ChatRoom" && <ChatRoom />}
              {view === "privateList" && <ChatPrivate />}
              {view === "privateRoom" && <ChatPrivateRoom />}
            </div>
            <div className="chatbtn" onClick={handleOpenCreateChatModal}>
              오픈 채팅방 개설하기 <FaPlus className="icon" />
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
