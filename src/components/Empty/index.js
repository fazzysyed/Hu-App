import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const AnimatedLoader = ({title}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/empty.jpg')}
        style={styles.animation}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AnimatedLoader;

const styles = StyleSheet.create({
  animation: {
    marginTop: 50,
    width: 350,
    height: 350,
    resizeMode: 'center',
  },
  container: {
    // flex: 0.5,

    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    bottom: 30,
  },
});
