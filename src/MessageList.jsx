import React from 'react';
import { Avatar, List } from 'antd'


const Message = ({from, text}) => {

  return (
      <div>
          <Avatar icon="user" />
          <strong>{from}</strong>
          <br/>
          <span>{text}</span>
      </div>
  )
}

const MessageList = ({messages}) => {
  
  return (
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={item => {
            if(item.text[item.text.length-1] === "+") {
              return (
                <List.Item>
                  <List.Item.Meta
                    style={{float:'right', display: 'table', textAlign: 'right'}}
                    avatar={<Avatar style={{float:'right'}} src="https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png" />}
                    title={<a href="https://ant.design">{item.from}</a>}
                    description= {item.text.slice(0,item.text.length-1)}
                  />
                </List.Item>
              )
            } else {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png" />}
                      title={<a href="https://ant.design">{item.from}</a>}
                      description= {item.text}
                    />
                  </List.Item>
                )
            }
            
          }}
        />
  )
}

export default MessageList;