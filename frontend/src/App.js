import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./fonts/font.css";

import Login from "./pages/user/LoginPage";
import Signup from "./pages/user/SignupPage";
import MyPage from "./pages/mypage/MypagePage";
import AboutusPage from "./pages/aboutus/AboutusPage";
import Header from "./components/common/HeaderComponent";
import Footer from "./components/common/FooterComponent";
import Home from "./pages/home/HomePage";
import NoticePage from "./pages/notice/NoticePage";
import NoticeDetail from "./pages/notice/NoticeDetailPage";
import StudyRoomList from "./pages/studylist/StudyRoomListPage";
import NoticeWritePage from "./pages/notice/NoticeWritePage";
import StudyRoom from "./pages/studyroom/StudyRoomPage";
import Sidebar from "pages/sidebar/SideBar";
import ChatList from "pages/sidebar/ChatList";
import PrivateChatRoom from "pages/sidebar/ChatRoom";
import KakaoLoginRedirectPage from "pages/user/KakaoLoginRedirectPage";

// axios 전역 설정
import axios from 'axios';
import { useSelector } from "react-redux";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const {accessToken} = useSelector((state)=>state.auth);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return (
    <div>
      <Sidebar>
        <ChatList />
        <PrivateChatRoom />
      </Sidebar>

      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/aboutus" element={<AboutusPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/noticedetail/:id" element={<NoticeDetail />} />
        <Route path="/studylist" element={<StudyRoomList />} />
        <Route path="/noticewritepage" element={<NoticeWritePage />} />
        <Route path="/studyroom/:id" element={<StudyRoom />} />
        <Route path="/login/kakao/code" element={<KakaoLoginRedirectPage />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
