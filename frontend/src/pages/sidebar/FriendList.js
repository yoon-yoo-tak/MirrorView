import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import onlineIcon from "assets/online.png";
import offlineIcon from "assets/offline.png";
import ProfileModal from "components/ProfileModal";

import "pages/sidebar/css/SideBar.css";

function FriendList({ setClickFriends, clickFriends, setClickChat }) {
  const [friends, setFriends] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get("/api/friends", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        // 온라인 유저가 먼저오도록 정렬
        const sortedFriends = response.data.data.sort((a, b) => {
          if (a.online === b.online) return 0;
          if (a.online && !b.online) return -1;
          return 1;
        });
        setFriends(sortedFriends);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const deleteFriend = (userId) => {
    axios
      .delete(`/api/friends/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          // Successfully deleted the friend. Now, remove from the list.
          setFriends((prevFriends) =>
            prevFriends.filter((friend) => friend.userId !== userId)
          );
          console.log("너랑 친구 안함", response);
        }
      })
      .catch((error) => {
        console.error("친구삭제 실패:", error);
      });
  };

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [goNickname, setGoNickname] = useState("");
  // 모달 기능
  const goUserProfile = (nickname) => {
    setOpenProfileModal(true);
    setGoNickname(nickname);
  };

  const closeUserProfile = () => {
    setOpenProfileModal(false);
  };

  return (
    <div className="wrap">
      <div className="search-section">
        <div className="result-section">
          {friends.map((friend) => {
            const icon = friend.online ? onlineIcon : offlineIcon;
            const altText = friend.online ? "online" : "offline";

            return (
              <div key={friend.userId} className="result-wrap">
                <div>
                  <img className="online" src={icon} alt={altText} />
                  <span
                    className="friendName"
                    onClick={() => goUserProfile(friend.nickname)}>
                    {friend.nickname}
                  </span>
                </div>
                <div
                  className="go-profile"
                  onClick={() => deleteFriend(friend.userId)}>
                  친구삭제
                </div>
              </div>
            );
          })}
        </div>
        {openProfileModal && ( // <-- 추가
          <ProfileModal
            nickname={goNickname}
            isOpen={openProfileModal}
            onClose={closeUserProfile}
            setClickFriends={setClickFriends}
            setClickChat={setClickChat}
          />
        )}
      </div>
    </div>
  );
}

export default FriendList;
