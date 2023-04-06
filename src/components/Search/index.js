import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeSearch = ({search, navigation, onChangeText, filterPress}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style={styles.container}>
        <Input
          leftIcon={
            <Icon
              name="search"
              size={22}
              color={'grey'}
              style={{marginRight: 10}}
            />
          }
          placeholder={'Search'}
          placeholderTextColor="#000000"
          value={search}
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          rightIcon={
            <View
              style={{
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                height: 20,
                width: 20,
              }}>
              <Cross name="cross" size={15} color={'#fff'} />
            </View>
          }
          inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>
      <TouchableOpacity
        onPress={filterPress}
        style={{
          backgroundColor: '#1C75BC',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          marginVertical: 2,
          borderRadius: 10,
        }}>
        <Icon name="options" size={30} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0.4,
    flexDirection: 'row',
    borderColor: '#707070',
    width: '80%',
    marginVertical: 2,

    height: 50,

    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    // fontFamily: 'Poppins-Regular',
    color: '#707070',
    fontSize: 15,
  },
});
