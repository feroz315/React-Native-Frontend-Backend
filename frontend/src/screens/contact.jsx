import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {COLORS} from '../const/colors';
import Toast from 'react-native-toast-message';


const {width} = Dimensions.get('screen');


const ProfileContact = ({navigation}) => {
  
  const [contact, setContact] = useState('');
  const [newContact, setNewContact] = useState('');


  const handleReset = async () => {
    if(!contact){
     Toast.show({
            type: 'error',
            text1: 'Validation Error!',
            text2: 'Please fill contact field.'
        });
        return;
    }
    try {
      fetch('http://192.168.1.10:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newContact: newContact,
          
        }),
      });
      console.log('Success', 'contact updated!');
      Toast.show({
            type: 'success', // Type of toast: 'success', 'error', 'info'
            text1: 'Contact Update Successfully!',  // Main message (header)
            text2: 'contact updated!' 
         });
      navigation.navigate('profile');
      setNewContact('');  
    } catch (error) {
      console.log('Error',
        error.response?.data?.message || 'Failed to contact',
      );
       Toast.show({
            type: 'error',
            text1: 'Validation Error!',
            text2: 'Failed to contact.'
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
        <Text style={styles.headerTitle}>New Contact</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Contact"
          value={contact}
          onChangeText={setContact}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Conatct"
          value={newContact}
          onChangeText={setNewContact}
          secureTextEntry
        />
      </View>

    
      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleReset}>
        <Text style={styles.signupButtonText}>Change Contact Number </Text>
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

export default ProfileContact;
