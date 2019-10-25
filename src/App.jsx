import React , {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { List, Avatar, Row, Col } from 'antd';

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
            <>
                 <Row>
                    <Col span={8}>
                        <UserList users={users} />
                    </Col>
                    <Col span={16}>
                        {messages.length !== 0 ?
                            <div>
                                <MessageList messages={messages} />
                                <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={name}/>
                            </div>
                            :
                            <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={name}/>
                        }
                    </Col>
                </Row>
            </>
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


const UserForm = (onUserSubmit) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUserSubmit.onUserSubmit(name);
    }

    const handleChange = (e) => {
        setName(e.target.value);
    };


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
};

const UserList = ({users}) => {
    return (
        <>
          <div>
            <List
             itemLayout="horizontal"
             dataSource={users}
             renderItem={item => (
             <List.Item>
                <List.Item.Meta
                 title={<a>{item.name}</a>}
                 />
             </List.Item>
            )}
           />
         </div>
        </>
    )
};





const MessageForm = (props) => {

    const { name, onMessageSubmit } = props;

    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = {
            from: name,
            text
        };
        onMessageSubmit(message);
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

const Message = (props) => {

    const { from, text } = props;

    return (
        <div>
            <strong>{from}</strong>
            <span>{text}</span>
        </div>
    )
}

const MessageList = ({messages}) => {
    return (
        <div>
        {
            messages.map((message, i) => {
                if (message === undefined) {
                    return;
                }
                return (
                    <Message
                       key={i}
                       from={message.from}
                       text={message.text}
                    />
                )
            })
        }
    </div>
    )
}



export default App;

