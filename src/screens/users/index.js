import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { chatCreate } from '../../store/chats/actions';
import { search } from '../../store/users/actions';
import styles from './styles';

const Users = ({ users, onSearch, onChatCreate }) => {
  const [name, setName] = useState('');

  const handleChange = () => (value) => {
    setName(value);
  };

  const handleSubmit = () => {
    onSearch(name);
  };

  const handleCreateChat = (userId) => {
    onChatCreate(userId);
  };

  return (
    <View style={styles.container}>
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
            <Touchable
              key={_id}
              style={styles.userRow}
              onPress={() => handleCreateChat(_id)}
            >
              <Text style={styles.userName}>{name}</Text>
            </Touchable>
          ))
        }
      </ScrollView>
    </View>
  );
};


export default connect(
  state => ({
    users: state.users.users,
  }),
  dispatch => ({
    onSearch: name => dispatch(search(name)),
    onChatCreate: userId => dispatch(chatCreate(userId)),
  }),
)(Users);
