import React, { PureComponent } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { openChat, sendMessage } from '../../store/socket';



class Chat extends PureComponent {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     openChat({
    //         user: this.props.user, receiver: this.props.receiver
    //     });
    // }

    handleSend = (message) => {
        sendMessage(message.text);
    }

    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
                user={{
                    _id: 1, //this.props.user.id
                }}
                onSend={message => this.handleSend(message[0])}
            />
        );
    }
}

export default connect((state, { navigation }) => ({
    messages: state.messages,
    user: state.user,
    // receiver: navigation.getParam('receivingUser')
}))(Chat);