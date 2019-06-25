import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { initApplication } from '../../store/app/actions';
import styles from './styles';

const LoadingScreen = ({ onInitApplication }) => {
  useEffect(() => {
    onInitApplication();
  });

  const [error] = useState(false);

  return (
    <View style={styles.container}>
      {!error && <Text>Simple Chat</Text>}
    </View>
  );
};

LoadingScreen.navigationOptions = {
  header: null,
};

export default connect(
  () => ({}),
  dispatch => ({
    onInitApplication: () => dispatch(initApplication()),
  }),
)(LoadingScreen);
