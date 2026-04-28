import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../const/colors';
import api from '../config/api';
import Toast from 'react-native-toast-message';


const {width} = Dimensions.get('screen');


const ChangeEmail = ({navigation}) => {
  
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');


  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      Toast.show({
      type: 'success', // Type of toast: 'success', 'error', 'info'
      text1: 'Fetch Successfully!',  // Main message (header)
      text2: 'profile successfully!' 
    });         
      setCurrentEmail(response.data.email);
    } catch (error) {
      console.error('Fetch profile error:', error);
       Toast.show({
          type: 'error',
          text1: 'Validation Error!',
          text2: 'Failed to load profile'
        });     
    }
  };

  const updateEmail = async () => {
    if (!newEmail || newEmail === currentEmail) {
      Toast.show({
          type: 'error',
          text1: 'Validation Error!',
          text2: 'Please enter a valid new email.'
        });
      return;
    }
    try {
       const token = await AsyncStorage.getItem('authToken');
       const response = await fetch('http://192.168.1.3:3000/api/profile/update-email',
        
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send stored token
        },
         body:JSON.stringify({ newEmail }),
      });

      const data = await response.json();       

      if (response.ok) {
      console.log('Success', response.data)
      Toast.show({
            type: 'success', // Type of toast: 'success', 'error', 'info'
            text1: 'Email update Successfully!',  // Main message (header)
            text2: 'updated successfully!' 
         });
      setCurrentEmail(response.data);
      setNewEmail('');
     } 
     else {
        Alert.alert('Error', data.message);
      } 
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to update email';
      console.log('Error', errorMsg)
       Toast.show({
          type: 'error',
          text1: 'Validation Error!',
          text2: 'Failed to update email.'
        });   
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
  container: {flex: 0.75, justifyContent: 'center', padding: scale(20)},
  title: {fontSize: moderateScale(24), marginBottom: verticalScale(20), textAlign: 'center'},

  signupButton: {
    // backgroundColor: '#FF6B35',
    width: scale(width * 0.75),
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
    width: scale(40),
    height: verticalScale(40),
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
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: scale(60),
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
});



export default ChangeEmail;

          
