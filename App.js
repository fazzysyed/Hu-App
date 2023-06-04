import React, {useState, useEffect} from 'react';

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

import {darkThemeColors, lightThemeColors} from './src/Constants/Colors';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Appointment from './src/Screens/Appointment';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from './src/Screens/Profile';
import Address from './src/Screens/Addresses';
import Chat from './src/Screens/Chat';

import CustomSidebarMenu from './src/components/SideMenu';
import {useDispatch, useSelector} from 'react-redux';
import TermsAndConditionsScreen from './src/Screens/Terms';
import Reservation from 'react-native-calendars/src/agenda/reservation-list/reservation';
import Reservations from './src/Screens/Reservations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from './src/Store/Actions/Actions';
import ReservationDetails from './src/Screens/ReservationDetails';

const STACK = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const isLoggedIn = useSelector(state => state.Reducer.user);
  const dispatch = useDispatch();
  const darkTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3370FF',
      borderColor: '#666666',
      background: '#000',
      text: '#FFFFFF',
      appleButton: '#FFFFFF',
      appleText: '#000',

      bottom: '#E5E5E5',
    },
  };

  const lightTheme = {
    ...DefaultTheme,
    roundness: 2,

    colors: {
      ...DefaultTheme.colors,
      primary: '#3370FF',
      borderColor: '#666666',
      background: '#FFFFFF',
      text: '#000',
      bottom: '#666666',
      appleButton: '#000',

      appleText: '#FFFFFF',
    },
  };
  const systemTheme = useColorScheme();
  const theme = systemTheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    getDataAsync();
  }, []);

  const getDataAsync = async () => {
    let user = await AsyncStorage.getItem('User');

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  };

  const AuthStack = () => {
    return (
      <STACK.Navigator>
        <>
          <STACK.Screen
            component={Login}
            name="Login"
            options={{headerShown: null}}
          />
          {/* <STACK.Screen
            component={Register}
            name="Register"
            options={{headerShown: null}}
          /> */}
        </>
      </STACK.Navigator>
    );
  };

  const AppStackNavigation = () => {
    return (
      <STACK.Navigator>
        <STACK.Screen
          name="Home1"
          component={Home}
          options={{headerShown: null}}
        />
        {/* <STACK.Screen
          component={Reservations}
          name="Reservations"
          options={{headerShown: null}}
        />
        <STACK.Screen
          component={ReservationDetails}
          name="ReservationDetails"
          options={{headerShown: null}}
        /> */}

        <STACK.Screen
          component={Details}
          name="Details"
          options={{headerShown: null}}
        />
        <STACK.Screen
          component={Appointment}
          name="Appointment"
          options={{headerShown: null}}
        />
        <STACK.Screen
          component={Chat}
          name="Chat"
          options={{headerShown: null}}
        />
        <STACK.Screen
          component={Address}
          name="Address"
          options={{headerShown: null}}
        />

        <STACK.Screen
          component={TermsAndConditionsScreen}
          name="Terms"
          options={{headerShown: null}}
        />
      </STACK.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}
        initialRouteName="Home">
        <Drawer.Screen
          component={AppStackNavigation}
          name="Home"
          options={{headerShown: null}}
        />
        <Drawer.Screen
          component={ProfileScreen}
          name="Profile"
          options={{headerShown: null}}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <AppStack /> */}
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <FlashMessage position="top" />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
