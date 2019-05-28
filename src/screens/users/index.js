import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, View, Touchable } from '../../components';
import * as COLORS from '../../constants/colors';
import { search } from '../../store/users/actions'

class Users extends PureComponent {
    openChat = (receivingUser) => {
        this.props.navigation.navigate('Chat', { receivingUser });
    }

    handleChange = (type, value) => {
        this.setState({ [type]: value });
    }

    handleSubmit = () => {
        const { name } = this.state
        const { onSearch } = this.props

        onSearch(name)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={value => this.handleChange('name', value)}
                    autoCapitalize='none'
                    style={styles.input}
                />
                <Touchable
                    onPress={this.handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </Touchable>
            </View>
        );
    }
}


export default connect(
    state => ({
        users: state.users
    }),
    dispatch => ({
        onSearch: (name) => dispatch(search(name)),
    }))(Users);

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