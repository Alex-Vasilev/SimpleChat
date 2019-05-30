import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { setChat } from '../../store/chats/actions';


class Chats extends PureComponent {
    static navigationOptions = {
        header: null
    }

    handleOpenChat = (chat) => {
        const { onChatOpen } = this.props
        onChatOpen(chat)
    }

    render() {
        const { chats } = this.props

        return (
            <View style={styles.container}>
                <Text>Chats</Text>
                <ScrollView>
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
                </ScrollView>
            </View>
        );
    }
}


export default connect(
    state => ({
        chats: state.chats.userChats
    }),
    dispatch => ({
        onChatOpen: (chat) => dispatch(setChat(chat))
    })
)(Chats);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BLUE,
        flex: 1,
        paddingTop: 100
    }
});