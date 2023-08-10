import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";

import FriendList from "pages/sidebar/FriendList";
import FriendRecieve from "pages/sidebar/FriendRecieve";
import FriendWait from "pages/sidebar/FriendWait";
import ChatList from "pages/sidebar/ChatList";
import ChatRoom from "pages/sidebar/ChatRoom";

import searchIcon from "../../assets/searchicon.png";

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
import { switchView } from "store/ChatViewStore";

import "pages/sidebar/css/SideBar.css";

const SidebarFriends = ({ setClickFriends, clickFriends }) => {
  const dispatch = useDispatch(); // <-- dispatch 함수 가져오기
  const webSocketState = useSelector((state) => state.webSocket);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);
  const userCount = useSelector((state) => state.webSocket.userCount);
  const [isOpen, setIsOpen] = useState(false);

  // 토글 기능
  const [isFriendsContentVisible, setFriendsContentVisible] = useState(true);
  const [isChatsContentVisible, setChatsContentVisible] = useState(true);
  const [friendContent, setFriendContent] = useState("null");
  const [chatContent, setChatContent] = useState("myChat");
  const friendsContentRef = useRef(null);
  const chatsContentRef = useRef(null);
  const [friendsContentHeight, setFriendsContentHeight] = useState("auto");

  useEffect(() => {
    // 만약 state.auth가 null이면, 사이드바를 닫는다.
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (clickFriends) {
      if (user === null) {
        // alert("로그인 필요");
        // return;
      }
      setIsOpen(true);
      console.log(webSocketState);
      const currentIsOpen = isOpen;
      setIsOpen(!currentIsOpen);

      if (currentIsOpen) {
        dispatch(closeWebSocket());
      } else {
        setFriendContent("friendList");
        setSelectedButton("friendList");
      }
      // setClickFriends(false);
    }
    else {
      setIsOpen(false); // 사이드바를 닫습니다.
    }
  }, [clickFriends]);

  const toggleFriendsContent = () => {
    if (isFriendsContentVisible) {
      setFriendsContentHeight(`${friendsContentRef.current.scrollHeight}px`);
    }
    setFriendsContentVisible(!isFriendsContentVisible);
  };

  useEffect(() => {
    if (!isFriendsContentVisible) {
      setFriendsContentHeight("0px");
    } else {
      setFriendsContentHeight("auto");
    }
  }, [isFriendsContentVisible, isChatsContentVisible]);

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
  const [selectedButton, setSelectedButton] = useState("friendList");

  const handleFriendContentChange = (content) => {
    setFriendContent(content);
    setSelectedButton(content);
  };

  // 채팅 기능
  // function renderChatContent() {
  //     switch (chatContent) {
  //         case "openChat":
  //             return <ChatList />;
  //         case "myChat":
  //             return <ChatList />;
  //         default:
  //             return null;
  //     }
  // }

  // const handleChatContentChange = (content) => {
  //     setChatContent(content);
  //     if (content === "myChat" || content === "openChat") {
  //         dispatch(switchView("ChatList"));
  //     } else {
  //         dispatch(switchView("ChatRoom"));
  //     }
  // };

  // chatContent 변경에 따른 데이터 로딩
  // useEffect(() => {
  //     if (chatContent === "openChat") {
  //         dispatch(loadChatRooms());
  //     } else if (chatContent === "myChat") {
  //         dispatch(loadChatRooms()); // 이부분을 나중에loadMyChatRooms로 변경해야 한다.
  //     }
  // }, [chatContent]);

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* <button
                    className={`openbtn ${isOpen ? "open" : ""}`}
                    onClick={toggleSidebar}
                >
                    ☰
                </button> */}

        {/* 친구 목록 섹션 */}
        <div className="sidebar-section">
          <div className="section-title">
            <h2>친구</h2>

            {/* <button onClick={toggleFriendsContent}>
                            {isFriendsContentVisible ? (
                                <FaChevronUp />
                            ) : (
                                <FaChevronDown />
                            )}
                        </button> */}
          </div>
          <div className="underline"></div>
          {/* <div
                        className={`section-content ${
                            isFriendsContentVisible ? "" : "collapsed"
                        }`}
                        style={{
                            maxHeight: isFriendsContentVisible
                                ? "none"
                                : friendsContentHeight,
                        }}
                        ref={friendsContentRef}
                    > */}
          <div className="nav-btn">
            <button
              onClick={() => handleFriendContentChange("friendList")}
              className={selectedButton === "friendList" ? "selected" : ""}>
              친구목록
            </button>
            <button
              onClick={() => handleFriendContentChange("friendRecieve")}
              className={selectedButton === "friendRecieve" ? "selected" : ""}>
              친구요청
            </button>
            <button
              onClick={() => handleFriendContentChange("friendWait")}
              className={selectedButton === "friendWait" ? "selected" : ""}>
              대기중
            </button>
          </div>
          {renderFriendContent()}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SidebarFriends;
