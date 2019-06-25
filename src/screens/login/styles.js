import { StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';

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

export default styles;
