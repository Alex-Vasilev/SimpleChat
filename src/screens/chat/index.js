import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/socket';


const Chat = ({ messages, user, chat: { _id: chatId } }) => {
  const handleSend = ({ text, createdAt }) => {
    sendMessage({
      chatId,
      text,
      createdAt,
      user,
    });
  };

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: user._id,
      }}
      onSend={messages => handleSend(messages[0])}
    />
  );
};

export default connect(state => ({
  messages: state.chats.currentChat.messages,
  user: state.user,
  chat: state.chats.currentChat,
  state,
}))(Chat);
