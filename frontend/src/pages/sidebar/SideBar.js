import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";

import FriendList from "pages/sidebar/FriendList";
import FriendRecieve from "pages/sidebar/FriendRecieve";
import FriendWait from "pages/sidebar/FriendWait";
import ChatList from "pages/sidebar/ChatList";
import ChatRoom from "pages/sidebar/ChatRoom";

import { useDispatch } from "react-redux"; // <-- useDispatch 불러오기
import { initializeWebSocket, closeWebSocket } from "store/WebSocketStore"; // <-- WebSocket 액션 불러오기
import { loadChatRooms } from "store/ChatRoomStore"; // loadRoom
import ChatModal from "pages/sidebar/ChatModal"; // <-- 추가
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/SideBar.css";

const Sidebar = () => {
  const view = useSelector((state) => state.chatView.view); // 채팅 component 변경
  const dispatch = useDispatch(); // <-- dispatch 함수 가져오기
  const webSocketState = useSelector((state) => state.webSocket);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [isOpen, setIsOpen] = useState(false);

  // 토글 기능
  const [isFriendsContentVisible, setFriendsContentVisible] = useState(true);
  const [isChatsContentVisible, setChatsContentVisible] = useState(true);
  const [friendContent, setFriendContent] = useState("friendList");
  const [chatContent, setChatContent] = useState("myChat");
  const friendsContentRef = useRef(null);
  const chatsContentRef = useRef(null);
  const [friendsContentHeight, setFriendsContentHeight] = useState("auto");
  const [chatsContentHeight, setChatsContentHeight] = useState("auto");

  const [showCreateChatModal, setShowCreateChatModal] = useState(false);

  // 모달 기능
  const handleOpenCreateChatModal = () => {
    setShowCreateChatModal(true);
  };

  const handleCloseCreateChatModal = () => {
    setShowCreateChatModal(false);
  };

  // 토글 기능, web socket 연결
  const toggleSidebar = () => {
    console.log("연결 시도 ", accessToken);
    console.log(webSocketState);
    const currentIsOpen = isOpen;
    setIsOpen(!currentIsOpen);

    if (currentIsOpen) {
      console.log("disconnected");
      dispatch(closeWebSocket());
    } else {
      console.log("connected");
      dispatch(initializeWebSocket(accessToken));
    }
  };

  const toggleFriendsContent = () => {
    if (isFriendsContentVisible) {
      setFriendsContentHeight(`${friendsContentRef.current.scrollHeight}px`);
    }
    setFriendsContentVisible(!isFriendsContentVisible);
  };

  const toggleChatsContent = () => {
    if (isChatsContentVisible) {
      setChatsContentHeight(`${chatsContentRef.current.scrollHeight}px`);
    }
    setChatsContentVisible(!isChatsContentVisible);
  };

  useEffect(() => {
    if (!isFriendsContentVisible) {
      setFriendsContentHeight("0px");
    } else {
      setFriendsContentHeight("auto");
    }
    if (!isChatsContentVisible) {
      setChatsContentHeight("0px");
    } else {
      setChatsContentHeight("auto");
    }
  }, [isFriendsContentVisible, isChatsContentVisible]);

  // web socket 상태 확인
  useEffect(() => {
    console.log(webSocketState);
  }, [webSocketState]);

  // 친구 목록 기능
  function renderFriendContent() {
    switch (friendContent) {
      case "friendList":
        return <FriendList />;
      case "friendRecieve":
        return <FriendRecieve />;
      case "friendWait":
        return <FriendWait />;
      default:
        return null;
    }
  }

  const handleFriendContentChange = (content) => {
    setFriendContent(content);
  };

  // 채팅 기능
  function renderChatContent() {
    switch (chatContent) {
      case "openChat":
        return <ChatList />;
      case "myChat":
        return <ChatList />;
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
        <button
          className={`openbtn ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* 친구 목록 섹션 */}
        <div className="sidebar-section">
          <div className="section-title">
            <h4>친구 목록</h4>
            <button onClick={toggleFriendsContent}>
              {isFriendsContentVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="underline"></div>
          <div
            className={`section-content ${
              isFriendsContentVisible ? "" : "collapsed"
            }`}
            style={{
              maxHeight: isFriendsContentVisible
                ? "none"
                : friendsContentHeight,
            }}
            ref={friendsContentRef}
          >
            <div className="nav-btn">
              <button onClick={() => handleFriendContentChange("friendList")}>
                {" "}
                친구목록{" "}
              </button>
              <button
                onClick={() => handleFriendContentChange("friendRecieve")}
              >
                {" "}
                친구요청{" "}
              </button>
              <button onClick={() => handleFriendContentChange("friendWait")}>
                {" "}
                대기중{" "}
              </button>
            </div>
            {renderFriendContent()}
          </div>
        </div>

        {/* 채팅 섹션 */}
        <div className="sidebar-section">
          <div className="section-title">
            <h4>채팅</h4>
            <button onClick={toggleChatsContent}>
              {isChatsContentVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="underline"></div>
          <div
            className={`section-content ${
              isChatsContentVisible ? "" : "collapsed"
            }`}
            style={{
              maxHeight: isChatsContentVisible ? "none" : chatsContentHeight,
            }}
            ref={chatsContentRef}
          >
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

            <button className="chatbtn" onClick={handleOpenCreateChatModal}>
              채팅 만들기 <FaPlus className="icon" />
            </button>
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

export default Sidebar;
