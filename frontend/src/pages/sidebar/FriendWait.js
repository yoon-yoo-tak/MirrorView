import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

function FriendWait() {
    const [friendRequests, setFriendRequests] = useState([]);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const notifier = new AWN();
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
        Swal.fire({
            title: '<div style="font-size:20px; font-family: HakgyoansimWoojuR;font-weight:bold;">친구 요청을 취소하시겠습니까?<div>',
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
                    .delete(
                        `/api/friends/${userId}`,
                        {},
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    )
                    .then((response) => {
                        console.log("너랑 친구 안함");
                        notifier.success("친구요청이 취소되었습니다", {
                            durations: { success: 3000 },
                        });
                        setFriendRequests(
                            friendRequests.filter(
                                (request) => request.userId !== userId
                            )
                        );
                        console.log("Friend request accepted:", response);
                    })
                    .catch((error) => {
                        console.error("There was an error!", error);
                    });
            }
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
                <div key={friend.userId}>
                    <div>
                        <div className="nameWrap" key={friend.userId}>
                            <div className="nameText">{friend.nickname}</div>
                            <div
                                className="cancel"
                                onClick={() => handleAccept(friend.userId)}
                            >
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
