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
import {darkThemeColors, lightThemeColors} from './src/Constants/Colors';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const STACK = createStackNavigator();

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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
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
            <STACK.Screen
              component={Home}
              name="Home"
              options={{headerShown: null}}
            />
            <STACK.Screen
              component={Details}
              name="Details"
              options={{headerShown: null}}
            />
          </>
        </STACK.Navigator>
      </NavigationContainer>
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
