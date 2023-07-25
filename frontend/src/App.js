// src/App.js
import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import MyPage from "./pages/mypage/MyPage";

import Header from "./pages/home/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage/*" element={<MyPage />} />
      </Routes>
    </div>
  );
};

export default App;
