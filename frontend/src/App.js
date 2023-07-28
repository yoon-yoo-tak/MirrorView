import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./fonts/font.css";


import Login from "./pages/user/login";
import Signup from "./pages/user/Signup";
import MyPage from "./pages/mypage/MyPage";
import About from './pages/Aboutus/about';
import Header from "./pages/Home/Header";
import Notice from "./pages/notice/notice";
import Noticepage from "./pages/notice/noticepage";
import Home from "./pages/Home/home";


const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/about" element={<About />} />   
        <Route path="/notice" element={<Notice />} />   
        <Route path="/noticepage" element={<Noticepage />} />       
      </Routes>
    </div>
    
  );
};

export default App;
