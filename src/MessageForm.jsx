import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE_REQUEST } from '../reducers/user';
import {socket} from './App';

const MessageForm = () => {

    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const { name, messages } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: MESSAGE_REQUEST,
            messages: [text, ...messages]
        });

        const message = {
            from: name,
            text
        };
        socket.emit('message', message);
        setText('');
    };

    const changeHandler = (e) => {
        setText(e.target.value);
    };

    return (
        <>
          <form className='MessageForm' onSubmit={handleSubmit}>
              <input
                className='MessageInput'
                onChange={changeHandler}
                value={text}
                placeholder="Message"
                autoFocus
              />
          </form>
        </>
    )
}

//export default MessageForm;