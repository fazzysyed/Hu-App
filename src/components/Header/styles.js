import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 40,

    borderBottomWidth: 0.4,
  },
  innerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 25,
    width: 25,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    height: 25,
    width: 25,
  },
});
