import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {stles} from '../Layout/styles';
import {useTheme, withTheme} from 'react-native-paper';
import Header from '../Header';
const componentName = ({children, back, navigation}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Header navigation={navigation} logo back={back} />
      <View style={{marginHorizontal: 10}}>{children}</View>
    </SafeAreaView>
  );
};

export default withTheme(componentName);