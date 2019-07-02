import React from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// import { Thread } from 'react-native-threads';
import { connect } from 'react-redux';
// import { setPublicKey } from '../../store/messages/actions';
import { sendMessage } from '../../store/socket';
import { encrypt } from '../../utils/crypt';


const Chat = ({
  messages,
  user,
  chat: { _id: chatId },
  destinationKeys,
}) => {
  // const [pending, setPending] = useState(true);


  const handleSend = ({ text, createdAt }) => {
    Promise.resolve(encrypt(text, destinationKeys[chatId]))
      .then((res) => {
        sendMessage({
          chatId,
          text: res,
          createdAt,
          user,
        });
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* {
        pending
          ? <ActivityIndicator size="large" color="#0000ff" /> */}
      {/* :  */}
      <GiftedChat
        messages={messages}
        user={{
          _id: user._id,
        }}
        onSend={messages => handleSend(messages[0])}
      />
      {/* } */}
    </View>
  );
};

export default connect(
  (state) => {
    const { user, chats: { currentChat }, messages } = state;

    return {
      messages: currentChat.messages,
      user,
      chat: currentChat,
      publicKeys: (messages.publicKeys && messages.publicKeys[user._id]) || {},
      privateKeys: (messages.privateKeys && messages.privateKeys[user._id]) || {},
      destinationKeys: (messages.destinationKeys && messages.destinationKeys[user._id]) || {},
    };
  },
)(Chat);
