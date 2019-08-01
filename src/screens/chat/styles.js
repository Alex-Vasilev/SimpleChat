import { StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.BLUE,
    padding: 8,
  },
});

export default styles;
