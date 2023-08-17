import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import searchIcon from "../../assets/searchicon.png";
import onlineIcon from "../../assets/online.png";
import offlineIcon from "../../assets/offline.png";

import ProfileModal from "components/ProfileModal";

import { useDispatch } from "react-redux";
import axios from "axios";
import "pages/sidebar/css/SideBar.css";

const SidebarSearch = ({ setClickSearch, clickSearch, setClickChat }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const [searchingId, setSearchingId] = useState("");
  const [searchedList, setSearchedList] = useState([]);

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  // 모달 기능
  const goUserProfile = (nickname) => {
    setOpenProfileModal(true);
    setSelectedMember(nickname);
  };

  const closeUserProfile = () => {
    setOpenProfileModal(false);
  };

  // 만약 state.auth가 null이면, 사이드바를 닫는다.
  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (clickSearch && user !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setSearchedList([]);
  }, [clickSearch, user]);

  // ---------------------------------------------------
  const handleSearch = (e) => {
    setSearchingId(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clickSearchUser();
    }
  };
  const clickSearchUser = async () => {
    if (!searchingId.trim()) {
      return; // 만약 searchingId가 빈 값이거나 공백만 있는 경우 함수를 종료
    }
    // searchingId를 검색하러 보내!!
    await axios
      .get(`api/users/findAll/${searchingId}`)
      .then(({ data }) => {
        const sortedList = data.data.sort((a, b) => {
          if (a.online && !b.online) return -1;
          if (!a.online && b.online) return 1;
          return 0;
        });

        setSearchedList(sortedList);
        //console.log(data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* 친구 목록 섹션 */}
        <div className="sidebar-section">
          <div className="section-title">
            <h2>사용자 검색</h2>
          </div>
          <div className="underline"></div>
          <div className="search-section">
            <div className="search-input-wrap">
              <TextField
                className="search-input"
                onChange={handleSearch}
                id="standard-basic"
                variant="standard"
                placeholder="닉네임으로 검색하세요"
                onKeyUp={handleKeyDown}
              />
              <img
                src={searchIcon}
                alt="search"
                className="search-button"
                onClick={clickSearchUser}
              />
            </div>
            <div className="result-section">
              {user &&
                searchedList.map((selectMember, index) => (
                  <div className="result-wrap" key={index}>
                    <div>
                      {selectMember.online ? (
                        <img className="online" src={onlineIcon} alt="online" />
                      ) : (
                        <img
                          className="online"
                          src={offlineIcon}
                          alt="offline"
                        />
                      )}{" "}
                      <div className="nameTextSearch">
                        {" "}
                        {selectMember.nickname}
                      </div>
                    </div>
                    {selectMember.nickname !== user.nickname && (
                      <div
                        className="go-profile"
                        onClick={() => goUserProfile(selectMember.nickname)}>
                        프로필
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          {openProfileModal && ( // <-- 추가
            <ProfileModal
              nickname={selectedMember}
              isOpen={openProfileModal}
              onClose={closeUserProfile}
              setClickChat={setClickChat}
              setClickSearch={setClickSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarSearch;
