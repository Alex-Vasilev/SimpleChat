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


    handleSend = (message) => {
        const { chat, user } = this.props

        sendMessage({
            user: {
                _id: user._id,
                name: user.name
            },
            chatId: chat._id,
            text: message.text,
            createdAt: message.createdAt
        });
    }

    render() {
        const { user } = this.props
        const { messages } = this.state

        return (
            <GiftedChat
                messages={messages}
                user={{
                    _id: user._id
                }}
                onSend={messages => this.handleSend(messages[0])}
            />
        );
    }
}

export default connect((state) => ({
    messages: state.messages.messages,
    user: state.user,
    chat: state.chats.chat
}))(Chat);