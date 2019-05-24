import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createReduxContainer } from 'react-navigation-redux-helpers';

import { View } from '../components';

import { default as PureNavigator } from './navigator';


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

    AppNavigator = createReduxContainer(PureNavigator);
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
