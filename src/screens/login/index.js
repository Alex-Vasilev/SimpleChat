import React, { Fragment, PureComponent } from 'react';
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import i18n from '../../localization';
import { auth } from '../../store/auth/actions';
import styles from './styles';

class Login extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  state = {
    isLoginOption: true,
    twoFAChecked: false,
  }

  handleChange = type => (value) => {
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
      twoFAChecked,
    } = this.state;
    const { onAuth } = this.props;

    onAuth(
      isLoginOption,
      name,
      password,
      email,
      countryCode,
      phoneNumber,
      isLoginOption,
      twoFAChecked,
    );
  }

  handleToggleRegisrationOption = () => {
    const { isLoginOption } = this.state;
    this.setState({
      isLoginOption: !isLoginOption,
    });
  }

  render() {
    const { isLoginOption, twoFAChecked } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t('LOGIN.TITLE')}</Text>
        <TextInput
          onChangeText={this.handleChange('name')}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.emailInput.focus()}
          style={styles.input}
          placeholder={i18n.t('LOGIN.NAME')}
        />
        {!isLoginOption && (
          <Fragment>
            <TextInput
              onChangeText={this.handleChange('email')}
              autoCapitalize="none"
              returnKeyType="next"
              style={styles.input}
              ref={(input) => { this.emailInput = input; }}
              onSubmitEditing={() => this.countryInput.focus()}
              placeholder={i18n.t('LOGIN.EMAIL')}
            />
            <TextInput
              onChangeText={this.handleChange('countryCode')}
              autoCapitalize="none"
              returnKeyType="next"
              style={styles.input}
              ref={(input) => { this.countryInput = input; }}
              onSubmitEditing={() => this.phoneInput.focus()}
              placeholder={i18n.t('LOGIN.COUNTRY_CODE')}
            />
            <TextInput
              onChangeText={this.handleChange('phoneNumber')}
              autoCapitalize="none"
              returnKeyType="next"
              style={styles.input}
              ref={(input) => { this.phoneInput = input; }}
              onSubmitEditing={() => this.passwordInput.focus()}
              placeholder={i18n.t('LOGIN.PHONE_NUMBER')}
            />
          </Fragment>
        )}
        <TextInput
          onChangeText={this.handleChange('password')}
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
        <CheckBox
          center
          title="2 FA auth"
          checked={twoFAChecked}
          onPress={() => this.setState({ twoFAChecked: !twoFAChecked })}
        />
      </View>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onAuth: (...args) => dispatch(auth(...args)),
  }),
)(Login);
