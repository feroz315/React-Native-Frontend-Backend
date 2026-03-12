import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';



const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

 
  const handleRequestReset = async () => {
   try {      
     fetch("http://192.168.1.7:3000/api/forgot-password",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email, 
      })

    })
      console.log('Success', 'Reset code sent to your email');
      navigation.navigate('reset', { email }); 
      } catch (error) {
      console.log('Error', error.response?.data?.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.signupButton} onPress={han}>
          <Text style={styles.signupButtonText}>Send Reset Code </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.signupButtonText}> Back to Login </Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
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



export default ForgotPassword;