import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/socket';
import { encrypt } from '../../utils/crypt';
import styles from './styles';
import { Touchable } from '../../components';
import { navigateToAddUserToChat } from '../../store/chats/actions';


const Chat = ({
  messages,
  user,
  chat: { _id: chatId },
  destinationKeys,
  onNavigateToAddUserToChat,
}) => {
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

  const handleAddUser = () => {
    onNavigateToAddUserToChat(chatId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Touchable
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}
          onPress={handleAddUser}
        >
          <Text>
            Add user to conversation
          </Text>
        </Touchable>
      </View>
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
  dispatch => ({
    onNavigateToAddUserToChat: chatId => dispatch(navigateToAddUserToChat(chatId)),
  }),
)(Chat);
