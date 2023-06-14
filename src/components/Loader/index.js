import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const AnimatedLoader = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../../assets/Animations/loader.json')}
          style={styles.animation}
          autoPlay
        />
      </View>
    </View>
  );
};

export default AnimatedLoader;

const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
    opacity: 1,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 200,
    top: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
