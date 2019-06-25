import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import i18n from '../../localization';
import { runVerify, sendVerificationSMS } from '../../store/auth/actions';
import styles from './styles';

class Verify extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  handleChange = type => (value) => {
    this.setState({ [type]: value });
  }

  handleSubmit = () => {
    const {
      code,
    } = this.state;
    const { onVerify } = this.props;

    onVerify(code);
  }

  handleRepeatSMS = () => {
    const { onSendSMS } = this.props;

    onSendSMS();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t('VERIFY.TITLE')}</Text>
        <TextInput
          onChangeText={this.handleChange('code')}
          autoCapitalize="none"
          style={styles.input}
          ref={(input) => { this.passwordInput = input; }}
          placeholder={i18n.t('VERIFY.CODE')}
        />
        <Touchable
          onPress={this.handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {i18n.t('SUBMIT')}
          </Text>
        </Touchable>
        <Text onPress={this.handleRepeatSMS}>
          {i18n.t('VERIFY.REPEAT')}
        </Text>
      </View>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onVerify: code => dispatch(runVerify(code)),
    onSendSMS: () => dispatch(sendVerificationSMS()),
  }),
)(Verify);
