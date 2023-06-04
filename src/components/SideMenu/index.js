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
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Store/Actions/Actions';

const CustomSidebarMenu = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Reducer.user);

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
          marginVertical: 10,
        }}
      />
      <Text style={styles.userName}>
        {user ? `${user.firstname} ${user.lastname}` : 'No Name'}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{fontFamily: 'Poppins-Regular'}}
          label="Visit Us"
          onPress={() => Linking.openURL('https://healthcare-up.com.com/')}
        />

        <View style={styles.customItem}>
          <Text
            onPress={() => {
              dispatch(logout());
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
