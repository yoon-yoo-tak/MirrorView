import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function FriendRecieve() {
  const [friendRequests, setFriendRequests] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get("/api/friends/request", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          setFriendRequests(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching friend requests:", error);
      });
  }, []);

  const acceptFriendRequest = (userId) => {
    axios
      .patch(
        `/api/friends/request/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          setFriendRequests((prevRequests) =>
            prevRequests.filter((request) => request.userId !== userId)
          );
          console.log("Friend request accepted:", response);
        }
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
      });
  };

  const rejectFriendRequest = (userId) => {
    axios
      .delete(`/api/friends/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          // 요청이 성공적으로 처리되면 해당 사용자를 목록에서 제거합니다.
          setFriendRequests((prevRequests) =>
            prevRequests.filter((request) => request.userId !== userId)
          );
          console.log("Friend request rejected:", response);
        }
      })
      .catch((error) => {
        console.error("Error rejecting friend request:", error);
      });
  };

  return (
    <div className="wrap">
      {friendRequests.map((request, index) => (
        <div>
          <div className="nameWrap" key={index}>
            <div className="nameText">{request.nickname}</div>
            <div className="buttonWrap">
              <div
                className="accept"
                onClick={() => acceptFriendRequest(request.userId)}>
                승인
              </div>
              <div
                className="reject"
                onClick={() => rejectFriendRequest(request.userId)}>
                거절
              </div>
            </div>
          </div>
          <div className="underline" />
        </div>
      ))}
    </div>
  );
}

export default FriendRecieve;
