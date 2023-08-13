import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "pages/sidebar/css/SideBar.css";

function FriendList() {
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

  return (
    <div className="wrap">
      {friends.map((friend) => (
        <div key={friend.userId}>
          <div className="nameWrap">
            <div className="nameText">
              {friend.nickname} {friend.online ? "(온라인)" : "(오프라인)"}
            </div>
            <div className="delete" onClick={() => deleteFriend(friend.userId)}>
              친구삭제
            </div>
          </div>
          <div className="underline" />
        </div>
      ))}
    </div>
  );
}

export default FriendList;
