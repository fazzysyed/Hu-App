import React, {useState, useEffect} from 'react';

import {
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

const STACK = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
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
  const [user, setUser] = useState();

  useEffect(() => {}, []);

  const AuthStack = () => {
    return (
      <STACK.Navigator>
        <>
          <STACK.Screen
            component={Login}
            name="Login"
            options={{headerShown: null}}
          />
          <STACK.Screen
            component={Register}
            name="Register"
            options={{headerShown: null}}
          />
        </>
      </STACK.Navigator>
    );
  };

  const AppStackNavigation = () => {
    return (
      <STACK.Navigator>
        <STACK.Screen
          name="Home"
          component={Home}
          options={{headerShown: null}}
        />
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
      </STACK.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
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
        <AppStack />
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
