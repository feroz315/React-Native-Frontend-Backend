import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';



const ResetPassword = ({route, navigation}) => {
  const {email} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleReset = async () => {
    if (!newPassword) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Please fill required field.',
      });
      return;
    }
    setLoading(true);
    try {
      fetch('http://192.168.1.12:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newpassword: newPassword,
        }),
      });
      console.log('Success', 'Password updated! Please login.');
      Toast.show({
        type: 'success', // Type of toast: 'success', 'error', 'info'
        text1: 'Password updated Successfully!', // Main message (header)
        text2: 'updated! Please login.',
      });
      navigation.navigate('login');
    } catch (error) {
      console.log(
        'Error',
        error.response?.data?.message || 'Failed to reset password',
      );
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Failed to reset password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtext}>Email: {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.signupButton} onPress={handleReset}>
          <Text style={styles.signupButtonText}> Reset Password </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {fontSize: 24, marginBottom: 20, textAlign: 'center'},
  subtext: {textAlign: 'center', marginBottom: 20, color: 'gray'},
  input: {borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5},
  signupButton: {
    backgroundColor: '#FF6B35', // Orange theme for food app
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResetPassword;
