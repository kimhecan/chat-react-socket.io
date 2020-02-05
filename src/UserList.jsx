import React from 'react';
import { List } from 'antd'


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

export default UserList