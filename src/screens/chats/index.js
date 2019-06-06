import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import * as ROUTES from '../../constants/routes';
import { setCurrentChatById } from '../../store/chats/actions';
import { navigate } from '../../store/navigation/actions';
import { logout } from '../../store/auth/actions';


class Chats extends PureComponent {
    static navigationOptions = {
      header: null,
    }

    handleOpenChat = (chatId) => {
      const { onChatOpen } = this.props;
      onChatOpen(chatId);
    }

    handleNavigateToUsers = () => {
      const { onNavigate } = this.props;
      onNavigate(ROUTES.USERS);
    }

    handleLogout = () => {
      const { onLogout } = this.props;
      onLogout();
    }

    render() {
      const { chats } = this.props;

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Touchable onPress={this.handleLogout}>
              <Text style={[styles.text]}>Logout</Text>
            </Touchable>
            <Touchable onPress={this.handleNavigateToUsers}>
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
                            onPress={() => this.handleOpenChat(chat._id)}
                          >
                            <Text style={styles.text}>{chat._id}</Text>
                          </Touchable>
                        ))
                    }
          </ScrollView>
        </View>
      );
    }
}


export default connect(
  state => ({
    chats: state.chats.userChats,
  }),
  dispatch => ({
    onChatOpen: chatId => dispatch(setCurrentChatById(chatId)),
    onNavigate: route => dispatch(navigate(route)),
    onLogout: () => dispatch(logout()),
  }),
)(Chats);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE,
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  text: {
    color: COLORS.WHITE,
  },
  title: {
    fontSize: 20,
  },
  rowChat: {
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: COLORS.WHITE,
  },
});
