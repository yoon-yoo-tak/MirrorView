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
                console.log(response.data.data);
                setFriends(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    // const friends = [
    //     { name: "바보", id: "1234" },
    //     { name: "메롱", id: "5678" },
    // ];

    return (
        <div className="wrap">
            {/* <p>친구</p> */}
            {friends.map((friend) => (
                <div>
                    <div className="nameWrap">
                        <div className="nameText" key={friend.id}>
                            {friend.name}
                        </div>
                        <div className="delete">삭제</div>
                    </div>
                    <div className="underline" />
                </div>
            ))}
        </div>
    );
}

export default FriendList;
