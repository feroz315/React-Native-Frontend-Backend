import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';


const API_URL = 'http://localhost:5000/api';



const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token || !newPassword) return Alert.alert('Error', 'Fill all fields');
    
    setLoading(true);
    try {
      await axios.post(`${API_URL}/reset-password`, { token, newPassword });
      Alert.alert('Success', 'Password updated! Please login.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to reset password');
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
        placeholder="Enter Reset Code from Email"
        value={token}
        onChangeText={setToken}
      />
      
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