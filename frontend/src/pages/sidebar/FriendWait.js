import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FriendWait() {
    const [friendRequests, setFriendRequests] = useState([]);
    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        axios.get('/api/friends/wait', { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
                console.log(response.data.data)
                setFriendRequests(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleAccept = (userId) => {
        axios.delete(`/${userId}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then((response) => {
                setFriendRequests(friendRequests.filter(request => request.name !== userId));
                console.log('Friend request accepted:', response);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            {friendRequests.length === 0 && <p>친구 요청 대기중</p>}
            {friendRequests.map((friend, index) => (
                <div key={index}>
                    <p>{friend.nickname}</p>
                    <button onClick={() => handleAccept(friend.userId)}>수락</button>
                </div>
            ))}
        </div>
    );
}

export default FriendWait;
