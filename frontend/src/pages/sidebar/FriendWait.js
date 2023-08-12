import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function FriendWait() {
  const [friendRequests, setFriendRequests] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get("/api/friends/wait", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setFriendRequests(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleAccept = (userId) => {
    axios
      .delete(
        `/api/friends/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        console.log("너랑 친구 안함");
        setFriendRequests(
          friendRequests.filter((request) => request.userId !== userId)
        );
        console.log("Friend request accepted:", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  // const friendRequests = [
  //     { nickname: "바보", id: "1234" },
  //     { nickname: "메롱", id: "5678" },
  // ];

  return (
    <div className="wrap">
      {friendRequests.length === 0 && (
        <div className="nameText">요청이 없습니다.</div>
      )}
      {friendRequests.map((friend, index) => (
        <div>
          <div>
            <div className="nameWrap" key={index}>
              <div className="nameText">{friend.nickname}</div>
              <div
                className="cancel"
                onClick={() => handleAccept(friend.userId)}>
                취소
              </div>
            </div>
          </div>
          <div className="underline" />
        </div>
      ))}
    </div>
  );
}

export default FriendWait;
