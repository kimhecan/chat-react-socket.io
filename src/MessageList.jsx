import React from 'react';
import { useSelector } from 'react-redux';
import {socket} from './App';

const from = ''
const text = ''

const Message = () => {

    socket.on('message', message => {
        from = message.from;
        text = message.text;
    });
    return (
        <div>
            <strong>{from}</strong>
            <span>{text}</span>
        </div>
    )
}

const MessageList = () => {

    const { messages } = useSelector((state) => state.user);
    return (
        <div>
        {
            messages.map((message, i) => {
                return (
                    <Message
                       key={i}
                       from={from}
                       text={text}
                    />
                )
            })
        }
    </div>
    )
}

//export default MessageList