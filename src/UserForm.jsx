import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';


const UserForm = ({onUserSubmit}) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      onUserSubmit(name);
  }

  const handleChange = (e) => {
      setName(e.target.value);
  };


  return (
      <> 
       <Form className='UserForm' onSubmit={handleSubmit}>
          <Input type= "text" value={name} placeholder="Username" onChange={handleChange} />   
          <Button type="primary" htmlType="submit">버튼버튼</Button>
       </Form>
      </> 
  )
};


export default UserForm;