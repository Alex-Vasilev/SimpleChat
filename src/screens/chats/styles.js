import { StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  text: {
    color: COLORS.BLUE,
  },
  title: {
    fontSize: 20,
  },
  rowChat: {
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: COLORS.BLUE,
  },
});

export default styles;
