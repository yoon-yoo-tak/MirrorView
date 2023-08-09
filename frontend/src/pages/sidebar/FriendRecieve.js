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
                        prevRequests.filter(
                            (request) => request.nickname !== userId
                        )
                    );
                    console.log("Friend request accepted:", response);
                }
            })
            .catch((error) => {
                console.error("Error accepting friend request:", error);
            });
    };

    const rejectFriendRequest = () => {};

    // const friendRequests = [
    //     { nickname: "바보", id: "1234" },
    //     { nickname: "메롱", id: "5678" },
    // ];

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
                                    acceptFriendRequest(request.nickname)
                                }
                            >
                                승인
                            </div>
                            <div
                                className="reject"
                                onClick={() =>
                                    rejectFriendRequest(request.nickname)
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
