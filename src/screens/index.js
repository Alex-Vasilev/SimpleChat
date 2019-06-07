import NetInfo from "@react-native-community/netinfo";
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { View } from '../components';
import { default as PureNavigator } from './navigator';
import _ from 'lodash-es';



let AppNavigator;

class App extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.array.isRequired,
    }),
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleConnectionChangeDebounced = _.debounce(this.handleConnectionChange, 1000);
    AppNavigator = createReduxContainer(PureNavigator);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChangeDebounced);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChangeDebounced);
  }

  handleConnectionChange = (isConnected) => {
    // TODO: need chek on device
    this.setState({ status: isConnected }, () => console.log(`is connected: ${this.state.status}`));
  }

  componentDidUpdate(prevProps) {
    const { appState } = this.props;

    if (appState != 'active' && prevProps.appState == 'active') {
      // TODO: implement logic
    }
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
    dispatch
  }),
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
