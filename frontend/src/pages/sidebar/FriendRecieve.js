import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FriendRecieve() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/friends/request')
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.data)
                    setFriendRequests(response.data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching friend requests:', error);
            });
    }, []);

    const acceptFriendRequest = (userId) => {
        axios.patch(`/api.friends/request/${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    setFriendRequests(friendRequests.filter(request => request.name !== userId)); 
                    console.log('Friend request accepted:', response);
                }
            })
            .catch((error) => {
                console.error('Error accepting friend request:', error);
            });
    };

    return (
        <div>
            {friendRequests.map((request, index) => (
                <div key={index}>
                    <p>친구 요청 옴: {request.nickname} </p> 
                    <button onClick={() => acceptFriendRequest(request.nickname)}>친구 요청 수락</button>
                </div>
            ))}
        </div>
    );
}

export default FriendRecieve;


