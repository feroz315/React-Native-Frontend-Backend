import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import api from '../config/api';


const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  // const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleReset = async () => {
    if (!newPassword) return Alert.alert('Error', 'Fill all fields');
    
    setLoading(true);
    try {
        fetch("http://192.168.1.7:3000/api/reset-password",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "newpassword": newPassword, 
      })
    })
      console.log('Success', 'Password updated! Please login.');
      navigation.navigate('login');
    } catch (error) {
      console.log('Error', error.response?.data?.message || 'Failed to reset password');
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
        <Button title="Reset Password" onPress={handleReset} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  subtext: { textAlign: 'center', marginBottom: 20, color: 'gray' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});



export default ResetPassword;