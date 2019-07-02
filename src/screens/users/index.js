import React, { Fragment, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { chatCreate } from '../../store/chats/actions';
import { search } from '../../store/users/actions';
import styles from './styles';

const Users = ({
  users, onSearch, onChatCreate, pending,
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
                users.map(({ _id, name }) => (
                  <View
                    style={styles.userRow}
                    key={_id}
                  >
                    <Text style={styles.userName}>{name}</Text>
                    <View style={styles.controlsSection}>
                      <Touchable
                        onPress={handleCreateChat(_id)}
                      >
                        <Text style={styles.userName}>Secret Chat</Text>
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
  state => ({
    users: state.users.users,
    pending: state.app.pending,
  }),
  dispatch => ({
    onSearch: name => dispatch(search(name)),
    onChatCreate: (...args) => dispatch(chatCreate(...args)),
  }),
)(Users);
