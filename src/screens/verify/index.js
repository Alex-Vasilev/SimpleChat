import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Text, Touchable, View } from '../../components';
import * as COLORS from '../../constants/colors';
import { runVerify, sendVerificationSMS } from '../../store/auth/actions';
import i18n from '../../localization';


class Verify extends PureComponent {
    static navigationOptions = {
      header: null,
    }

    handleChange = (type, value) => {
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
            onChangeText={value => this.handleChange('code', value)}
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
  state => ({
    // TODO: temp
    state,
  }),
  dispatch => ({
    onVerify: code => dispatch(runVerify(code)),
    onSendSMS: () => dispatch(sendVerificationSMS()),
  }),
)(Verify);

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
