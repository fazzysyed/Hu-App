import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Logout from 'react-native-vector-icons/AntDesign';

const CustomSidebarMenu = props => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <Image
        source={require('../../assets/images/placeholderimage.jpeg')}
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: '#1C75BC',
          alignSelf: 'center',
        }}
      />
      <Text style={styles.userName}>Faraz Syed</Text>
      <DrawerContentScrollView style={{bottom: 30}} {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{fontFamily: 'Poppins-Regular'}}
          label="Visit Us"
          onPress={() => Linking.openURL('https://healthcare-up.com.com/')}
        />

        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://healthcare-up.com.com/');
            }}>
            Logout
          </Text>
          <Logout name="logout" style={styles.iconStyle} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginBottom: 2,
    fontSize: 21,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    marginTop: 10,

    alignSelf: 'center',
  },
});

export default CustomSidebarMenu;
