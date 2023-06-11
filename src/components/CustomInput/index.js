import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Input} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomInput = ({
  value,
  onChangeText,
  errorMessage,
  keyboardType,
  maxLength,
  label,
  secureTextEntry,
  height,
}) => {
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.label}>
        {label}
      </Text>
      <Input
        secureTextEntry={secureTextEntry}
        maxLength={maxLength ? maxLength : 1000000}
        placeholder={label}
        value={value}
        errorMessage={errorMessage}
        inputContainerStyle={{borderBottomWidth: 0}}
        onChangeText={text => onChangeText(text)}
        keyboardType={keyboardType}
        style={[
          styles.input,
          {
            height: height ? 100 : 50,

            textAlignVertical: height ? 'top' : undefined,
          },
        ]}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {width: '100%', alignSelf: 'center'},
  label: {
    fontSize: hp(1.8),
    color: '#000',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 10,
  },
  input: {
    color: '#000',
    padding: 10,
    height: 50,
    borderWidth: 1,

    borderRadius: 8,
    borderColor: '#E4E4E4',
    marginTop: 10,
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Regular',
  },
});
