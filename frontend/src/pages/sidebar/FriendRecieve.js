import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { WebSocketContext } from "WebSocketContext";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

function FriendRecieve() {
    const [friendRequests, setFriendRequests] = useState([]);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const { user } = useSelector((state) => state.auth);
    const { client } = useContext(WebSocketContext);
    const notifier = new AWN();

    useEffect(() => {
        axios
            .get("/api/friends/request", {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data.data);
                    setFriendRequests(response.data.data);
                }
            })
            .catch((error) => {
                //console.error("Error fetching friend requests:", error);
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
                    notifier.success(`${nickname}님과 친구가 되었습니다!`, {
                        durations: { success: 3000 },
                    });
                    setFriendRequests((prevRequests) =>
                        prevRequests.filter(
                            (request) => request.userId !== userId
                        )
                    );
                    //console.log("친구가 수락됨", response);
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
                //console.error("Error accepting friend request:", error);
            });
    };

    const rejectFriendRequest = (userId) => {
        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">요청을 거절하시겠습니까?<div>',
            icon: "question",
            width: 400,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#D4D4D4",
            cancelButtonText: "취소",
            confirmButtonText: "넹",
            // buttons: true,
            // dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/friends/${userId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            // 요청이 성공적으로 처리되면 해당 사용자를 목록에서 제거합니다.
                            notifier.success("요청이 거절되었습니다", {
                                durations: { success: 3000 },
                            });
                            setFriendRequests((prevRequests) =>
                                prevRequests.filter(
                                    (request) => request.userId !== userId
                                )
                            );
                            //console.log("Friend request rejected:", response);
                        }
                    })
                    .catch((error) => {
                        //console.error("Error rejecting friend request:", error);
                    });
            }
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
                                }
                            >
                                승인
                            </div>
                            <div
                                className="reject"
                                onClick={() =>
                                    rejectFriendRequest(request.userId)
                                }
                            >
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
