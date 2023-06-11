import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {stles} from '../Layout/styles';
import {useTheme, withTheme} from 'react-native-paper';
import Header from '../Header';
import {useSelector} from 'react-redux';
import AnimatedLoader from '../Loader';
const componentName = ({children, back, navigation, noMargin}) => {
  const theme = useTheme();
  const apploadingApp = useSelector(state => state.Reducer.appLoading);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Header navigation={navigation} logo back={back} />
      <View style={{marginHorizontal: noMargin ? 0 : 10}}>{children}</View>

      {/* {true && <AnimatedLoader />} */}
    </SafeAreaView>
  );
};

export default withTheme(componentName);
