import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button = ({onPress, title, disabled, loading, color, font, width}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: color ? color : 'red', width: width ? width : '95%'},
      ]}>
      {loading ? (
        <ActivityIndicator color={'#FFFFFF'} />
      ) : (
        <Text allowFontScaling={false} style={styles.title}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(4),
    borderRadius: hp(1),
    paddingVertical: hp(2),

    alignSelf: 'center',

    marginHorizontal: 10,
  },
  title: {
    fontSize: hp(2),
    color: '#FFFFFF',
    elevation: 2,
    // fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
