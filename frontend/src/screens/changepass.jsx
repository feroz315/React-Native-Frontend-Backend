import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
          <Text style={styles.iconText}>←</Text>
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
  container: {flex: 0.75, justifyContent: 'center', padding: 20},
  title: {fontSize: 24, marginBottom: 20, textAlign: 'center'},

  signupButton: {
    // backgroundColor: '#FF6B35',
    width: width * 0.75,
    height: 45,
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 50,
    marginHorizontal: 25,
  },
  signupButtonText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },

  // header Icon
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 25,
    // backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default ChangePassword;
