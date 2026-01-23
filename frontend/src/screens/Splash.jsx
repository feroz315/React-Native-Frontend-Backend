import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      navigation.replace('signup');  // Replace with your main screen name
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/food.png')}  // Path to your image
        style={styles.image}
        resizeMode="contain"  // Adjust to 'cover' or 'stretch' as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',  // Customize background color
  },
  image: {
    width: width * 0.8,  // 80% of screen width
    height: height * 0.5,  // 50% of screen height
  },
});


export default SplashScreen;