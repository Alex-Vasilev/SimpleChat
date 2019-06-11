import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { chatCreate } from '../../store/chats/actions';
import { search } from '../../store/users/actions';


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
                    users.map(user => (
                      <Touchable
                        key={user._id}
                        style={styles.userRow}
                        onPress={() => handleCreateChat(user._id)}
                      >
                        <Text style={styles.userName}>{user.name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.RED,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: COLORS.BLUE,
    borderBottomWidth: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    color: COLORS.BLUE,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: '75%',
    backgroundColor: COLORS.BLUE,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  userRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLUE,
    width: '100%',
  },
  userName: {
    color: COLORS.BLUE,
    paddingVertical: 6,
  },
  usersContainer: {
    width: '100%',
  },
});
