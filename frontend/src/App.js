// src/App.js
import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./fonts/font.css";

import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import MyPage from "./pages/mypage/MyPage";
import About from "./pages/Aboutus/about";
import Header from "./pages/home/Header";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage/*" element={<MyPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default App;
