import React, { Fragment } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as ROUTES from '../../constants/routes';
import { logout } from '../../store/auth/actions';
import { setCurrentChatById } from '../../store/chats/actions';
import { navigate } from '../../store/navigation/actions';
import styles from './styles';

const Chats = ({
  chats,
  onLogout,
  onNavigate,
  onChatOpen,
  pending,
}) => {
  const handleOpenChat = (chatId) => {
    onChatOpen(chatId);
  };

  const handleNavigateToUsers = () => {
    onNavigate(ROUTES.USERS);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      {pending
        ? <ActivityIndicator size="large" color="#0000ff" />
        : (
          <Fragment>
            <View style={styles.header}>
              <Touchable onPress={handleLogout}>
                <Text style={[styles.text]}>Logout</Text>
              </Touchable>
              <Touchable onPress={handleNavigateToUsers}>
                <Text style={[styles.text]}>Users</Text>
              </Touchable>
            </View>
            <Text style={[styles.text, styles.title]}>Chats</Text>
            <ScrollView>
              {
              chats.map(chat => (
                <Touchable
                  key={chat._id}
                  style={styles.rowChat}
                  onPress={() => handleOpenChat(chat._id)}
                >
                  <Text style={styles.text}>{chat.createdAt}</Text>
                </Touchable>
              ))
            }
            </ScrollView>
          </Fragment>
        )}
    </View>
  );
};

Chats.navigationOptions = {
  header: null,
};

export default connect(
  state => ({
    chats: state.chats.userChats,
    pending: state.app.pending,
  }),
  dispatch => ({
    onChatOpen: chatId => dispatch(setCurrentChatById(chatId)),
    onNavigate: route => dispatch(navigate(route)),
    onLogout: () => dispatch(logout()),
  }),
)(Chats);
