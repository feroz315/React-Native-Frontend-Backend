import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {COLORS} from '../const/colors';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('screen');

import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Register Failed!',
      });
    }
    try {
      const response = await fetch('http://192.168.1.7:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      });
      if (response.ok) {
        console.log('Success', response.ok);
        Toast.show({
          type: 'success', // Type of toast: 'success', 'error', 'info'
          text1: 'Successfully!', // Main message (header)
          text2: 'Register get successfully!',
        });
        setFormData(response);
        navigation.navigate('login');
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error!',
        text2: 'Failed!',
      });

      console.log('error hai', e);
    }
  };

  const openGmail = () => {
    // Use react-native-email-link or custom linking for a better experience
    Linking.openURL('https://accounts.google.com');
  };

  const Login = async () => {
    navigation.navigate('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Logo/Image */}
        <Image
          source={require('../assets/images/boy.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign Up </Text>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={text => setFormData({...formData, name: text})}
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
            secureTextEntry
          />
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
          <Text style={styles.signupButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.accountsign}>
          <Text style={styles.forgetButtonText}>Don't have an account? </Text>
          <TouchableOpacity onPress={Login}>
            <Text style={styles.signupbtn}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.forgetButtonText}>Or </Text>

        {/* Gmail Button */}
        <View style={styles.gmailbtn}>
          <TouchableOpacity style={styles.GmailButton} onPress={openGmail}>
            <Image
              source={require('../assets/images/gmail.jpg')}
              style={styles.gmaillogo}
            />
            <Text style={styles.gmailtext}>Sign in With Google </Text>
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
    width: scale(100),
    height: verticalScale(140),
    marginBottom: verticalScale(5),
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
  subtitle: {
    fontSize: moderateScale(16),
    color: '#666',
    marginBottom: verticalScale(30),
    textAlign: 'center',
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
  signupButton: {
    width: scale(width * 0.75),
    height: verticalScale(45),
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginTop: verticalScale(10),
  },
  signupButtonText: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    textAlign: 'center',
  },
  
  accountsign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(20),
  },
  signupbtn: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.navy,
    textAlign: 'center',
  },
  GmailButton: {
    width: scale(width * 0.70),
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(15),
    marginTop: verticalScale(10),
    borderWidth: 2,
    borderColor: '#000',
  },
  gmailtext: {
    fontSize: moderateScale(16),
    color: COLORS.dark,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  gmaillogo: {
    width: scale(30),
    height: verticalScale(30),
    alignSelf: 'center',
  },
  gmailbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signup;
