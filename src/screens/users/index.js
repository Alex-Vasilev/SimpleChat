import React, { Fragment, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { chatCreate, addUserToChat } from '../../store/chats/actions';
import { search } from '../../store/users/actions';
import styles from './styles';


const Users = ({
  users,
  onSearch,
  onChatCreate,
  pending,
  params,
  onAddUserToChat,
}) => {
  const [name, setName] = useState('');

  const handleChange = () => (value) => {
    setName(value);
  };

  const handleSubmit = () => {
    onSearch(name);
  };

  const handleCreateChat = userId => () => {
    onChatCreate(userId);
  };

  const handleAddUser = (...args) => () => {
    onAddUserToChat(...args);
  };

  return (
    <View style={styles.container}>
      {
        pending
          ? <ActivityIndicator size="large" color="#0000ff" />
          : (
            <Fragment>
              <TextInput
                onChangeText={handleChange('name')}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={COLORS.BLUE}
              />
              <Touchable
                onPress={handleSubmit}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Search</Text>
              </Touchable>
              <ScrollView style={styles.usersContainer}>
                {
                  users.map(({ _id, name, isOnline }) => (
                    <View
                      style={styles.userRow}
                      key={_id}
                    >
                      <View style={styles.infoSection}>
                        <Text style={styles.userName}>{name}</Text>
                        <Text style={[
                          styles.online,
                          isOnline
                            ? { color: COLORS.GRAY }
                            : { color: COLORS.GRAY_LIGHTER }]}
                        >
                          {isOnline ? 'Online' : 'Offline'}
                        </Text>
                      </View>
                      <View style={styles.controlsSection}>
                        <Touchable
                          onPress={
                            Object.keys(params).length > 0 && params.addindUser
                              ? handleAddUser(_id, params.chatId)
                              : handleCreateChat(_id)
                          }
                        >
                          {
                            Object.keys(params).length > 0 && params.addindUser
                              ? <Text style={styles.userName}>Add user</Text>
                              : <Text style={styles.userName}>Secret Chat</Text>
                          }
                        </Touchable>
                      </View>
                    </View>
                  ))
                }
              </ScrollView>
            </Fragment>
          )}
    </View>
  );
};


export default connect(
  (state, props) => ({
    users: state.users.users,
    pending: state.app.pending,
    params: props.navigation.state.params || {},
  }),
  dispatch => ({
    onSearch: name => dispatch(search(name)),
    onChatCreate: (...args) => dispatch(chatCreate(...args)),
    onAddUserToChat: (...args) => dispatch(addUserToChat(...args)),
  }),
)(Users);
