import React, {useState} from 'react';

const MessageForm = ({name, onMessageSubmit}) => {

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

export default MessageForm;