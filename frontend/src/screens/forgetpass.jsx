import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {COLORS} from '../const/colors';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('screen');

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRequestReset = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Please enter a valid email.',
      });
      return;
    }
    try {
      fetch('http://192.168.1.2:3000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log('Success', 'Reset code sent to your email');
      Toast.show({
        type: 'success', // Type of toast: 'success', 'error', 'info'
        text1: 'Reset code sent to your email!', // Main message (header)
        text2: 'Reset code sent successfully!',
      });
      navigation.navigate('reset', {email});
    } catch (error) {
      console.log(
        'Error',
        error.response?.data?.message || 'Failed to send email',
      );
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Failed to send email.',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Logo/Image */}
        <Image
          source={require('../assets/images/Photo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.subtext}>
            By continuing, you agree to the Terms and conditions
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleRequestReset}>
              <Text style={styles.signupButtonText}>Send Reset Code </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.signupButtonText}> Back to Login </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  logo: {
    width: scale(200),
    height: verticalScale(200),
    marginBottom: verticalScale(20),
    alignSelf: 'center',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: '#333',
    marginBottom: verticalScale(25),
    textAlign: 'center',
  },
  inputContainer: {
    width: scale('100%'),
    marginBottom: verticalScale(15),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    backgroundColor: '#f9f9f9',
  },
  signupButton: {
    // backgroundColor: '#FF6B35',
    width: scale(width * 0.75),
    height: verticalScale(45),
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(20),
    marginHorizontal: scale(25),
  },
  signupButtonText: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    textAlign: 'center',
  },
  sendButton: {
    // backgroundColor: '#FF6B35',
    width: scale(width * 0.75),
    height: verticalScale(45),
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(70),
    marginHorizontal: scale(25),
  },
  subtext: {
    fontFamily: 'Poppins',
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginHorizontal: scale(15),
    marginTop: verticalScale(15),
    color: COLORS.dark,
  },
});

export default ForgotPassword;
