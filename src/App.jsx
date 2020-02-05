import React , {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { Row, Col } from 'antd';
import UserForm from './UserForm';
import UserList from './UserList';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

const socket = io('localhost:8081');

const App = () => {
    
    const [users, setUsers] = useState(null);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            const messagess = [...messages, message];
            setMessages(messagess);
        });
        socket.on('update', ({users}) => {
            setUsers(users);
        });
    }, [users, messages]);

    const handleMessageSubmit = (message) => {
        const messagess = [...messages, message];
        setMessages(messagess);
        socket.emit('message', message);
    };


    const handleUserSubmit = (name) => {
        socket.emit('join', name);
        setName(name);
    };


    const Layout = () => {
        return(
            <Row>
                <Col span={8}>
                    <UserList users={users} />
                </Col>
                <Col span={16}>
                    {messages.length !== 0 ?
                        <div> 
                            <MessageList messages={messages}/>
                            <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={name}/>
                        </div>
                        :
                        <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={name}/>
                    }
                </Col>
            </Row>
        )
    }

    const renderUserForm = () => {
       return  <UserForm onUserSubmit = {name => handleUserSubmit(name)}/>
    }

    return (
        <>
         {(name !== '' && users !== null) ? Layout() : renderUserForm()}
        </>
    )
};

export default App;

