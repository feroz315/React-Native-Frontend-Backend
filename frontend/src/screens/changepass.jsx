import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {COLORS} from '../const/colors';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('screen');

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  

  const handleReset = async () => {
    if (!password || !newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Please fill in all required fields.',
      });
      return;
    }

    try {
      fetch('http://192.168.1.12:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newpassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      console.log('Success', 'Password updated! Please login.');
      Toast.show({
        type: 'success', // Type of toast: 'success', 'error', 'info'
        text1: 'Password updated Successfully!', // Main message (header)
        text2: 'Password updated! Please login.',
      });
      navigation.navigate('profile');
      setNewPassword('');
      confirmPassword('');
    } catch (error) {
      console.log(
        'Error',
        error.response?.data?.message || 'Failed to reset password',
      );
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Failed to reset password',
      });
    }
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
           <Image source={require("../assets/images/arrowl.png")}
            style={styles.icon}
            />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confrim Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleReset}>
        <Text style={styles.signupButtonText}>Change Password </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 0.75, justifyContent: 'center', padding: scale(20)},
  title: {fontSize: moderateScale(24), marginBottom: verticalScale(20), textAlign: 'center'},

  signupButton: {
    // backgroundColor: '#FF6B35',
    width: width * 0.75,
    height: verticalScale(45),
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(50),
    marginHorizontal: scale(25),
  },
  signupButtonText: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    textAlign: 'center',
  },

  // header Icon
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    marginTop: verticalScale(25),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconButton: {
    width: scale(30),
    height: verticalScale(28),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: moderateScale(20),
    color: '#333',
  },
  icon: {
    width:scale(15),
    height:verticalScale(16), 
  },
  headerTitle: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: scale(50),
  },
  inputContainer: {
    width: '100%',
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
});

export default ChangePassword;
