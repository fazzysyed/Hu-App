import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {getDayTime} from '../../Helper/GetDayTime';

const HomeHeader = ({user, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          {user.profile ? (
            <FastImage
              source={{
                uri: user.profile,
                priority: FastImage.priority.high,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={Constants.PROFILE_PLACE_HOLDER}
              style={styles.profile}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text allowFontScaling={false} style={styles.greeting}>
            Hi, {getDayTime()}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: hp(2.3),
              color: '#FFFFFF',
              fontFamily: 'Poppins-Bold',
              width: 180,
            }}>
            {user.username}
          </Text>
        </View>
        <View
          style={{
            marginVertical: hp(3),
            flexDirection: 'row',
            width: '25%',
            alignSelf: 'center',
            // marginLeft: wp(2),
          }}>
          <View style={{width: '20%', alignSelf: 'center', right: 5}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
              }}>
              <ImageBackground
                source={Constants.HOME_NOTIFICATION_ICON}
                style={styles.notification}>
                {appointmentBadge.notifications != 0 &&
                  appointmentBadge.notifications != null && (
                    <View
                      style={{
                        backgroundColor: 'red',
                        height: 18,
                        width: 18,
                        borderRadius: 18,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bottom: 10,
                        right: 12,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 10,
                          color: '#FFFFFF',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {appointmentBadge.notifications}
                      </Text>
                    </View>
                  )}
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{width: '20%', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={{width: '100%', height: '100%'}}>
              <Image
                source={Constants.HOME_PROFILE_EDIT}
                style={styles.editProfile}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN,
    height: 180,
    flexDirection: 'row',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
    alignSelf: 'center',
    marginBottom: hp(0.5),
  },
  image: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  innerContainer: {flexDirection: 'row', marginTop: 5, alignItems: 'center'},
  imageContainer: {
    marginVertical: hp(3),
    width: '20%',
    height: '40%',
    alignSelf: 'center',
  },
  profile: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    marginVertical: hp(3),
    width: '55%',
    alignSelf: 'center',
    marginLeft: wp(3),
  },
  scanner: {
    width: '100%',
    height: '100%',
    marginRight: wp(10),
    resizeMode: 'contain',

    alignSelf: 'center',
  },
  notification: {
    width: 25,
    height: 25,

    resizeMode: 'contain',
    alignSelf: 'center',
  },
  editProfile: {
    width: '100%',
    height: '100%',
    marginRight: wp(1),
    resizeMode: 'contain',
    marginLeft: wp(5),
    alignSelf: 'center',
  },
  greeting: {
    fontSize: hp(1.7),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
});
