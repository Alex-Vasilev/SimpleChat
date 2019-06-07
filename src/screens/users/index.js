import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Touchable } from '../../components';
import * as COLORS from '../../constants/colors';
import { search } from '../../store/users/actions'
import { chatCreate } from '../../store/chats/actions'


class Users extends PureComponent {
    handleCreateChat = (userId) => {
        const { onChatCreate } = this.props
        onChatCreate(userId)
    }

    handleChange = type => value => {
        this.setState({ [type]: value });
    }

    handleSubmit = () => {
        const { name } = this.state
        const { onSearch } = this.props

        onSearch(name)
    }

    render() {
        const { users } = this.props

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={this.handleChange('name')}
                    autoCapitalize='none'
                    style={styles.input}
                />
                <Touchable
                    onPress={this.handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </Touchable>
                <ScrollView style={styles.usersContainer}>
                    {
                        users.map(user => {
                            return (
                                <Touchable
                                    key={user._id}
                                    style={styles.userRow}
                                    onPress={() => this.handleCreateChat(user._id)}
                                >
                                    <Text style={styles.userName}>{user.name}</Text>
                                </Touchable>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}


export default connect(
    state => ({
        users: state.users.users
    }),
    dispatch => ({
        onSearch: (name) => dispatch(search(name)),
        onChatCreate: (userId) => dispatch(chatCreate(userId))
    }))(Users);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.RED,
        paddingHorizontal: 40
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.WHITE
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: COLORS.TRANSPARENT,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: 10
    },
    button: {
        width: '75%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 15
    },
    buttonText: {
        color: COLORS.RED,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    userRow: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.WHITE,
        width: '100%'
    },
    userName: {
        color: COLORS.WHITE,
        paddingVertical: 6,
    },
    usersContainer: {
        width: '100%'
    }
});