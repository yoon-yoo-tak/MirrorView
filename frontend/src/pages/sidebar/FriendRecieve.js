import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { WebSocketContext } from "WebSocketContext";

function FriendRecieve() {
  const [friendRequests, setFriendRequests] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { user } = useSelector((state) => state.auth);
  const { client } = useContext(WebSocketContext);

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

  const acceptFriendRequest = ({ userId, nickname }) => {
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
          console.log("친구가 수락됨", response);
          const message = {
            type: "FRIEND_ACCEPTED",
            data: {
              fromUser: user.nickname,
              toUser: nickname,
            },
          };

          client.send("/app/global.one", {}, JSON.stringify(message));
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
                onClick={() =>
                  acceptFriendRequest({
                    userId: request.userId,
                    nickname: request.nickname,
                  })
                }>
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
