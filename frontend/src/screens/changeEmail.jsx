import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS} from '../const/colors';
import api from '../config/api';


const {width} = Dimensions.get('screen');


const ChangeEmail = ({navigation}) => {
  
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handleReset = async () => {
    try {
      fetch('http://192.168.1.9:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newEmail: newEmail,
          
        }),
      });
      console.log('Success', 'contact updated!');
      navigation.navigate('profile');
      setNewEmail('');
      
    } catch (error) {
      console.log(
        'Error',
        error.response?.data?.message || 'Failed to contact',
      );
    }
  };


  // const handleUpdateEmail = async () => {
  //   try {
  //     const response = await fetch('http://192.168.1.9:3000/api/profile/update-email', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${userToken}`, // Send stored token
  //       },
  //       body: JSON.stringify({ newEmail: email }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       Alert.alert('Success', 'Email updated successfully');
  //     } else {
  //       Alert.alert('Error', data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentEmail(response.data.email);
    } catch (error) {
      console.error('Fetch profile error:', error);
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const updateEmail = async () => {
    if (!newEmail || newEmail === currentEmail) {
      Alert.alert('Error', 'Please enter a valid new email');
      return;
    }
    
    try {
       const token = await AsyncStorage.getItem('authToken');
       const response = await fetch('http://192.168.1.9:3000/api/profile/update-email',
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send stored token
        },
        body: JSON.stringify({ newEmail: currentEmail }),
      });

      const data = await response.json();
      if (response.ok) {
      setCurrentEmail(response);
      setNewEmail('');
     } 
     else {
        Alert.alert('Error', data.message);
      } 
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update email';
      console.log('Error', errorMsg)
      Alert.alert('Error', errorMsg);
   }
  }
     
 




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Email</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Email"
          value={currentEmail}  
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Email"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          />
      </View>     

    
      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={updateEmail}>
        <Text style={styles.signupButtonText}>Update Email </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 60,
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



export default ChangeEmail;

          
