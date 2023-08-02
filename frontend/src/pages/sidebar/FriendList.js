import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FriendList() {
    const [friends, setFriends] = useState([]);
    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        axios.get('/api/friends', { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
                console.log(response.data.data); 
                setFriends(response.data.data); 
            })
            .catch(error => {
                console.error('There was an error!', error); 
            });
    }, []); 

    return (
        <div>
            <p>친구</p>
            {friends.map(friend => <p key={friend.id}>{friend.name}</p>)} 
        </div>
    );
}

export default FriendList;
