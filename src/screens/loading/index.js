import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as COLORS from '../../constants/colors';
import { initApplication } from '../../store/app/actions';


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    backgroundColor: COLORS.BLUE,
  },
});
