import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import Left from 'react-native-vector-icons/AntDesign';
import Search from 'react-native-vector-icons/AntDesign';
import {useTheme, Appbar} from 'react-native-paper';

const index = ({logo, back, title, search, navigation}) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {borderBottomColor: theme.colors.borderColor}]}>
      <View style={styles.innerContainer}>
        {back ? (
          <Left
            name="arrowleft"
            size={25}
            color={theme.colors.text}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <View style={styles.empty} />
        )}
        {logo ? (
          <Image
            source={require('../../assets/images/logo-image.png')}
            style={styles.logo}
          />
        ) : (
          <Text style={[styles.title, {color: theme.colors.text}]}>
            {title}
          </Text>
        )}
        {search ? (
          <Search name="search1" size={25} color={theme.colors.text} />
        ) : (
          <View style={styles.empty} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,

    // borderBottomWidth: 0.4,
    // backgroundColor: 'red',
  },
  innerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 25,
    width: 150,
    resizeMode: 'contain',
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
export default index;
