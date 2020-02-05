import React, {useState} from 'react';
import { Form, Input } from 'antd';

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
        <Form className='MessageForm' onSubmit={handleSubmit}>
            <Input
              className='MessageInput'
              onChange={changeHandler}
              value={text}
              placeholder="Message"
              autoFocus
            />
        </Form>
      </>
  )
}

export default MessageForm;