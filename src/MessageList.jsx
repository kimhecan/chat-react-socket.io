import React from 'react';


const Message = ({from, text}) => {

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

export default MessageList;