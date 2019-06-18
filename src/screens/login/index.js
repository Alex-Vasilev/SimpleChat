import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { auth } from '../../store/auth/actions';
import i18n from '../../localization';


class Login extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  state = {
    isLoginOption: true,
  }

  handleChange = (type, value) => {
    this.setState({ [type]: value });
  }

  handleSubmit = () => {
    const {
      isLoginOption,
      name,
      password,
      email,
      countryCode,
      phoneNumber,
    } = this.state;
    const { onAuth } = this.props;

    onAuth(
      name,
      password,
      email,
      countryCode,
      phoneNumber,
      isLoginOption,
    );
  }

  handleToggleRegisrationOption = () => {
    const { isLoginOption } = this.state;
    this.setState({
      isLoginOption: !isLoginOption,
    });
  }

  render() {
    const { isLoginOption } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t('LOGIN.TITLE')}</Text>
        <TextInput
          onChangeText={value => this.handleChange('name', value)}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.emailInput.focus()}
          style={styles.input}
          placeholder={i18n.t('LOGIN.NAME')}
        />
        {!isLoginOption && (
        <Fragment>
          <TextInput
            onChangeText={value => this.handleChange('email', value)}
            autoCapitalize="none"
            returnKeyType="next"
            style={styles.input}
            ref={(input) => { this.emailInput = input; }}
            onSubmitEditing={() => this.countryInput.focus()}
            placeholder={i18n.t('LOGIN.EMAIL')}
          />
          <TextInput
            onChangeText={value => this.handleChange('countryCode', value)}
            autoCapitalize="none"
            returnKeyType="next"
            style={styles.input}
            ref={(input) => { this.countryInput = input; }}
            onSubmitEditing={() => this.phoneInput.focus()}
            placeholder={i18n.t('LOGIN.COUNTRY_CODE')}
          />
          <TextInput
            onChangeText={value => this.handleChange('phoneNumber', value)}
            autoCapitalize="none"
            returnKeyType="next"
            style={styles.input}
            ref={(input) => { this.phoneInput = input; }}
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder={i18n.t('LOGIN.PHONE_NUMBER')}
          />
        </Fragment>
        )
        }
        <TextInput
          onChangeText={value => this.handleChange('password', value)}
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
          ref={(input) => { this.passwordInput = input; }}
          placeholder={i18n.t('LOGIN.PASSWORD')}
        />
        <Touchable
          onPress={this.handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {' '}
            {isLoginOption ? i18n.t('LOGIN.LOGIN') : i18n.t('LOGIN.REGISTER')}
          </Text>
        </Touchable>
        <Text
          style={styles.text}
          onPress={this.handleToggleRegisrationOption}
        >
          {isLoginOption
            ? i18n.t('LOGIN.TO_REGISTER')
            : i18n.t('LOGIN.TO_LOGIN')}
        </Text>
      </View>
    );
  }
}

export default connect(
  state => ({
    // TODO: temp
    state,
  }),
  dispatch => ({
    onAuth: (...args) => dispatch(auth(...args)),
  }),
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.RED,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: COLORS.TRANSPARENT,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    color: COLORS.BLACK,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  button: {
    width: '75%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.RED,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
