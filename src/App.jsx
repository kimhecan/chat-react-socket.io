import React , {useState, useEffect} from 'react';
import io from 'socket.io-client';
import async from 'async';

const socket = io('localhost:8080');

const App = () => {

    console.log('App 컴포넌트');
    
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    

    useEffect(() => {
        console.log('useEffect');
        socket.on('message', (message) => {
            const messagess = [message, ...messages];
            setMessages({messagess});
        });
         socket.on('update', (users) => {
             setUsers(users);
             console.log('setUser');
         });
        console.log('useEffect after');
    }, []);

    const handleMessageSubmit = (message) => {
        console.log('handleMessageSubmit');
        const messagess = [message, ...messages];
        setMessages(messagess);
        socket.emit('message', message);
    };


    const handleUserSubmit = (name) => {
        console.log('handleUserSubmit');
        setName(name);
        socket.emit('join', name);
    };


    const Layout = () => {
        console.log('Layout 컴포넌트');
        return (
            <div id='App'>
                <div id='AppHeader'>
                    <div id='AppTitle'>
                        ChatApp
                    </div>
                    <div id='AppRoom'>
                        App room
                     </div>
                </div>
                 <div id='AppBody' style={{ width: '70px', height: '100px', border: '1px solid black'}}>
                     <UserList users={users} />
                    <div id='MessageWrapper' style={{ width: '50px', height: '70px', border: '1px solid black' }}>
                        <MessageList messages={messages} />
                        <MessageForm onMessageSubmit={message => handleMessageSubmit(message)} name={name}/>
                    </div>
                </div>
            </div>
        )
    }

    const renderUserForm = () => {
       return  <UserForm onUserSubmit = {name => handleUserSubmit(name)}/>
    }

    return (
        <>
         {name !== '' ? Layout() : renderUserForm()}
        </>
    )
};


const UserForm = (onUserSubmit) => {
    console.log('UserForm 컴포넌트');
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



const UserList = (users) => {
    
    console.log('UserList 컴포넌트');
    console.log(users);
    return (
        <>
          <div className='Users'>
            <div className='UsersOnline'>
                {users.length} people online
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
};


const MessageForm = (onMessageSubmit, name) => {

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

const Message = (key, from, text) => {

    return (
        <div>
            <strong>{from}</strong>
            <span>{text}</span>
        </div>
    )
}

const MessageList = (messages) => {

    return (
        <div>
        {
            messages.map((message, i) => {
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

