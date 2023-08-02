import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FriendList() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get('/api/friends')
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
