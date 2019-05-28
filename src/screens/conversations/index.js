import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from '../../components';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';

class Conversations extends PureComponent {
    openChat = (receivingUser) => {
        // this.props.navigation.navigate('Chat', { receivingUser });
    }

    render() {
        const { conversations } = this.props
        return (
            <View style={styles.container}>
                {
                    conversations.map(conversation => (
                        <View key={conversation._id}>

                            <TouchableOpacity
                                onPress={() => this.handleOpenChat(conversation._id)}
                            >
                                <Text >{conversation._id}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        );
    }
}


export default connect(state => ({
    conversations: state.conversations
}))(Conversations);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
        height: '100%',
        width: '100%'
    }
});