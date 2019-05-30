import React, { PureComponent } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { sendMessage } from '../../store/socket';




class Chat extends PureComponent {
    state = {
        messages: []
    }

    static getDerivedStateFromProps(props, state) {
        if (state.messages !== props.messages) {
            return {
                messages: props.messages,
            };
        }
        return null;
    }


    handleSend = ({ text, createdAt }) => {
        const {
            chat: { _id: chatId },
            user
        } = this.props

        sendMessage({
            user,
            chatId,
            text,
            createdAt
        });
    }

    render() {
        const { user: { _id } } = this.props
        const { messages } = this.state

        return (
            <GiftedChat
                messages={messages}
                user={{
                    _id
                }}
                onSend={messages => this.handleSend(messages[0])}
            />
        );
    }
}

export default connect((state) => ({
    messages: state.messages.incomingMessages,
    user: state.user,
    chat: state.chats.currentChat
}))(Chat);