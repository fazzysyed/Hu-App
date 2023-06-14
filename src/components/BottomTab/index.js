import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Fav from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import AppointmentList from '../../Screens/Home';

import Dashboard from '../../Screens/Home';

import Contract from 'react-native-vector-icons/FontAwesome5';
import Logs from '../../Screens/Home';

import Chat from 'react-native-vector-icons/Entypo';

import Reservations from '../../Screens/Reservations';
import Contracts from '../../Screens/Contracts';

import Profile from '../../Screens/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const user = useSelector(state => state.Reducer.user);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: null,
      }}
      tabBarOptions={{
        showLabel: true,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#000',
          borderTopColor: 'transparent',
          height: 100,
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={user.type === 'pro' ? Reservations : Dashboard}
        options={{
          tabBarAllowFontScaling: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Chat
                size={25}
                name="home"
                color={focused ? '#1C75BC' : '#ccc'}
              />
            </View>
          ),
        }}
      />

      {user.type != 'pro' && (
        <Tab.Screen
          name={'Reservations'}
          component={Reservations}
          options={{
            tabBarAllowFontScaling: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Fav
                  size={25}
                  name="emoji-people"
                  color={focused ? '#1C75BC' : '#ccc'}
                  style={{position: 'absolute'}}
                />
              </View>
            ),
          }}
        />
      )}

      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarAllowFontScaling: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Chat
                size={25}
                name="user"
                color={focused ? '#1C75BC' : '#ccc'}
                style={{position: 'absolute'}}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Contracts'}
        component={Contracts}
        options={{
          tabBarAllowFontScaling: false,

          tabBarIcon: ({focused}) => (
            <Contract
              size={25}
              name="file-contract"
              color={focused ? '#1C75BC' : '#ccc'}
              style={{position: 'absolute'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Chats'}
        component={Logs}
        options={{
          tabBarBadgeStyle: {
            fontSize: 10,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarAllowFontScaling: false,

          tabBarIcon: ({focused}) => (
            <Chat
              size={25}
              name="chat"
              style={{position: 'absolute'}}
              color={focused ? '#1C75BC' : '#ccc'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#1C75BC',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  badge: {
    height: 18,
    width: 18,
    backgroundColor: 'red',
    borderRadius: 10,

    bottom: 0,
    top: 0,
    marginBottom: 10,

    zIndex: 10,
    left: 13,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tabs;
