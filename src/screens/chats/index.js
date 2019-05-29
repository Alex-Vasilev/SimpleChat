import React, { PureComponent } from 'react';
import { View, Text, Touchable } from '../../components';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { setChat } from '../../store/chats/actions'


class Chats extends PureComponent {
    handleOpenChat = (chat) => {
        const { onChatOpen } = this.props
        onChatOpen(chat)
    }

    render() {
        const { chats } = this.props
        return (
            <View style={styles.container}>
                {
                    chats.map(chat => (
                        <View key={chat._id}>
                            <Touchable
                                onPress={() => this.handleOpenChat(chat)}
                            >
                                <Text style={{ color: '#fff' }}>{chat._id}</Text>
                            </Touchable>
                        </View>
                    ))
                }
            </View>
        );
    }
}


export default connect(
    state => ({
        chats: state.chats.chats
    }),
    dispatch => ({
        onChatOpen: (chat) => dispatch(setChat(chat))
    })
)(Chats);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
        flex: 1
    }
});