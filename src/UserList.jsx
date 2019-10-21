import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {

    const { users } = useSelector((state) => state.user);
    console.log(users, "UserList");

    socket.emit('join', name);
    
    return (
        <>
          <div className='Users'>
            <div className='UsersOnline'>
                {users.length} people onlien
            </div>
            <ul className='UsersList'>
                {
                   users.map((user) => {
                       return (
                        <li key={user.id} className='UserItem'>
                            {user.name}
                        </li>
                        );
                    })
                }
            </ul>
          </div>
        </>
    )
}

//export default UserList;