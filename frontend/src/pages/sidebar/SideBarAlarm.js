import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { WebSocketContext } from "WebSocketContext";
import "pages/sidebar/css/SideBar.css";

import { useDispatch } from "react-redux"; // <-- useDispatch 불러오기
import axios from "axios";
import {
  formatDateTime,
  removeNotification,
  setNotifications,
} from "store/GlobalStore";

const SideBarAlarm = ({ setClickAlarm, clickAlarm }) => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch(); // <-- dispatch 함수 가져오기
  const webSocketState = useSelector((state) => state.webSocket);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);
  const userCount = useSelector((state) => state.webSocket.userCount);
  const [isOpen, setIsOpen] = useState(false);

  const alarms = useSelector((state) => state.global.globalMessage);

  const readAlarm = async (notificationId) => {
    const response = await axios.post(
      `/api/alarms/read/${notificationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      // 알림 리스트에서 해당 알림 제거
      dispatch(removeNotification(notificationId));
    } else {
      console.error("알림 제거 실패");
    }
  };

  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (clickAlarm) {
      if (user === null) {
        // alert("로그인 필요");
        // return;
      }
      setIsOpen(true);
      const currentIsOpen = isOpen;
      setIsOpen(!currentIsOpen);
    } else {
      setIsOpen(false); // 사이드바를 닫습니다.
    }
  }, [clickAlarm]);

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-section">
          <div className="section-title">
            <h2>알림</h2>
          </div>
          <div className="alarm-list">
            {alarms.map((alarm) => (
              <div key={alarm.id} className="alarm-item">
                <div className="alarm-item">
                  <div className="alarm-text">{alarm.message}</div>
                  <div className="alarm-text">
                    {formatDateTime(alarm.timestamp)}
                  </div>
                  <button
                    className="read-button"
                    onClick={() => readAlarm(alarm.id)}>
                    읽음
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarAlarm;
