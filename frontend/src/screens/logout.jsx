import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing tokens
import { useNavigation } from '@react-navigation/native'; // Assuming React Navigation



const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

const handleContinue = () => {
      navigation.replace('bottomNav');
  
}


  const handleLogout = async () => {
    setLoading(true);
    try {
      // Retrieve token from storage (adjust based on your auth setup)
      const token = await AsyncStorage.getItem('authToken');
      
      // API call to logout endpoint
      const response = await axios.post('http://192.168.1.10:3000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if required
        },
      });

      if (response.status === 200) {
        // Clear local storage
        await AsyncStorage.removeItem('authToken');
        // Navigate to login screen
        navigation.replace('login'); // Or your login screen name
      }
    } catch (error) {
      Alert.alert('Logout Failed', 'Unable to log out. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'continue shopping...' : 'Continue'}</Text>
      </TouchableOpacity>
     
      <Text style={styles.title}>Are you sure you want to log out?</Text>
  
      <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging out...' : 'Logout'}</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Logout;