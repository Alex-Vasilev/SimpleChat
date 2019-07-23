import NetInfo from '@react-native-community/netinfo';
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import _ from 'lodash-es';
import { View } from '../components';
import PureNavigator from './navigator';


let AppNavigator;

class App extends PureComponent {
  constructor() {
    super();
    this.handleConnectionChangeDebounced = _.debounce(this.handleConnectionChange, 1000);
    AppNavigator = createReduxContainer(PureNavigator);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChangeDebounced);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); },
    );
  }

  componentDidUpdate(prevProps) {
    const { appState } = this.props;

    if (appState !== 'active' && prevProps.appState === 'active') {
      // TODO: implement logic
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChangeDebounced,
    );
  }

  handleConnectionChange = (isConnected) => {
    // TODO: need chek on device
    this.setState({ status: isConnected }, () => console.warn('is connected: '));
  }

  render() {
    const { navigation, dispatch } = this.props;
    return (
      <View style={styles.container}>
        <AppNavigator state={navigation} dispatch={dispatch} />
      </View>
    );
  }
}

export default connect(
  state => ({
    appState: state.app.appState,
    navigation: state.navigation,
  }),
  dispatch => ({
    dispatch,
  }),
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
