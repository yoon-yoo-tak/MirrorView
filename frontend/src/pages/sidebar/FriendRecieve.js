import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FriendRecieve() {
    const [friendRequests, setFriendRequests] = useState([]);
    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        axios.get('/api/friends/request', { headers: { Authorization: `Bearer ${accessToken}` } })
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
        axios.patch(`/api/friends/request/${userId}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then((response) => {
                if (response.status === 200) {
                    setFriendRequests(prevRequests => prevRequests.filter(request => request.nickname !== userId));
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


