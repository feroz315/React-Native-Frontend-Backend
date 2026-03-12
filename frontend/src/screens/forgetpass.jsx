import React, { useState } from 'react';
import { View, Text,Image, Dimensions,TextInput,SafeAreaView,ScrollView, Button, StyleSheet,TouchableOpacity ,Alert, ActivityIndicator } from 'react-native';
import { COLORS } from "../const/colors";
 

const { width } = Dimensions.get("screen");



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
    
     <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Logo/Image */}
        <Image source={require('../assets/images/Photo.png')} style={styles.logo} resizeMode="contain" />
   
  <Text style={styles.title}>Forgot Password</Text>
   <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.subtext}>By continuing, you agree to the Terms and conditions</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        <TouchableOpacity style={styles.sendButton} onPress={handleRequestReset}>
          <Text style={styles.signupButtonText}>Send Reset Code </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.signupButtonText}> Back to Login </Text>
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
      padding: 20,
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 20,
      alignSelf: 'center',
      
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      fontFamily:"Poppins",
      color: '#333',
      marginBottom: 25,
      textAlign: 'center',
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
    signupButton: {
      // backgroundColor: '#FF6B35', 
      width: width * 0.75,
      height:45,
      backgroundColor: COLORS.navy,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      borderRadius: 20,
      marginTop:20,
      marginHorizontal:25    
    },
    signupButtonText: {
      fontSize:16,
      color: COLORS.white,
      textAlign:'center'       
    },
    sendButton: {
      // backgroundColor: '#FF6B35', 
      width: width * 0.75,
      height:45,
      backgroundColor: COLORS.navy,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      borderRadius: 20,
      marginTop:40, 
      marginHorizontal:25   
    },
   subtext:{
        fontFamily:"Poppins",
        fontSize:12,
        fontWeight:"500",
        marginHorizontal:15,
        marginTop:15,
        color:COLORS.dark      
    },
 

});



export default ForgotPassword;