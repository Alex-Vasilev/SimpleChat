import { StyleSheet } from 'react-native';
import * as COLORS from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: COLORS.BLUE,
    borderBottomWidth: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    color: COLORS.BLUE,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: '75%',
    backgroundColor: COLORS.BLUE,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  userRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLUE,
    width: '100%',
  },
  userName: {
    color: COLORS.BLUE,
    paddingVertical: 6,
  },
  usersContainer: {
    width: '100%',
  },
});

export default styles;
