import React, { useState } from 'react';
import { Form, Input, Button, Icon } from 'antd';


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
       <Form className='UserForm' onSubmit={handleSubmit} style={{textAlign: 'center', marginTop: '70px'}}>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type= "text"
            placeholder="Username" 
            onChange={handleChange}
            value={name}
            style={{width: '500px', height: '50px'}}
             />
          <br/>
          <br/>
          <Button type="primary" htmlType="submit" style={{width: '500px', backgroundColor: 'rgb(15, 76, 129)', borderColor: 'rgb(15 ,76, 129)'}}>채팅방 입장</Button>
       </Form>
      </> 
  )
};


export default UserForm;