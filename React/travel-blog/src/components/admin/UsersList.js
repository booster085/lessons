import React from 'react';

const UsersList = (users) =>
    <div>
        <h3>Registered users</h3>
        <ul>
            {Object.keys(users).map((k) => <li key={k}>{users[k].username}</li>)}
        </ul>
    </div>

export default UsersList;