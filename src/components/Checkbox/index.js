import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Check from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'react-native-paper';

const index = ({checked, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: checked ? '#1C75BC' : '#C2C9D4',
          backgroundColor: checked ? '#1C75BC' : '#fff',
        },
      ]}>
      {checked && (
        <Check name="check" size={18} color={checked ? '#FFFFFF' : '#000'} />
      )}
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 25,
    borderWidth: 1,

    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
