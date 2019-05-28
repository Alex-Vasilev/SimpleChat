import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as COLORS from '../../constants/colors';
import { initApplication } from '../../store/app/actions';





class LoadingScreen extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    isLoaded: PropTypes.bool,
    onInitApplication: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  state = {
    error: null,
  };

  componentDidMount() {
    const { onInitApplication } = this.props;;

    onInitApplication()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Simole Chat</Text>
      </View>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onInitApplication: () => dispatch(initApplication())
  })
)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    backgroundColor: COLORS.RED,
  }
});
