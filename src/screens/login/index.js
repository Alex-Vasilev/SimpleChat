import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux';

import { View, Text, Touchable } from '../../components';
// import { login, register } from '../../store/auth/actions';
import { login, register } from '../../store/socket';
import * as COLORS from '../../constants/colors';


class Login extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        };
    }

    handleChange = (type, value) => {
        this.setState({ [type]: value });
    }

    handleSubmit = () => {
        this.state.registration ?
            this.props.onRegister()
            :
            this.props.onLogin();
    }

    handleToggleRegisrationOption = () => {
        this.setState({
            registration: !this.state.registration
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Enter your name and password:</Text>
                <TextInput
                    onChangeText={value => this.handleChange('name', value)}
                    returnKeyType='next'
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style={styles.input}
                />
                <TextInput
                    onChangeText={value => this.handleChange('password', value)}
                    secureTextEntry
                    returnKeyType='go'
                    autoCapitalize='none'
                    style={styles.input}
                    ref={input => this.passwordInput = input}
                />
                <Touchable
                    onPress={this.handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}> {this.state.registration ? 'Register' : 'Login'}</Text>
                </Touchable>
                <Text style={styles.text} onPress={this.handleToggleRegisrationOption}>
                    {this.state.registration ? 'Go to login' : 'Go to registration'}
                </Text>
            </View>
        )
    }
}

export default connect(
    () => ({}),
    dispatch => ({
        onLogin: () => dispatch(login()),
        onRegister: () => dispatch(register())
    })
)(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.RED,
        height: '100%',
        width: '100%'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.WHITE
    },
    input: {
        height: 40,
        width: '90%',
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
    }
});
