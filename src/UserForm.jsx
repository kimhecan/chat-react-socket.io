import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INPUT_REQUEST } from '../reducers/user';

import {socket} from './App';


const UserForm = () => {

    const [name, setName] = useState('');
    
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: INPUT_REQUEST,
            data: name
        })
        socket.emit('join', name);
        
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <> 
         <form className='UserForm' onSubmit={handleSubmit}>
             이름:
             <input
                className='UserInput'
                 value={name}
                 placeholder='Write your nickname and hit enter'
                 onChange={handleChange}
             />
             <button type="submit">버튼버튼</button>
         </form>
        </> 
    )
}
//export default UserForm;