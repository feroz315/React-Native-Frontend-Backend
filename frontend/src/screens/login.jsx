import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const Submit = async () => {

   try {      
     fetch("http://192.168.1.8:3000/api/login",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password,
        
      })
     })
     .then(res=>res.json())
     .then(async (data)=> { 
       console.log("userlogin", data )
       navigation.navigate("bottomNav")
       await AsyncStorage.getItem('token',data.token)
     })
      } catch (e) {
              console.log("error hai",e)
            }

  
  }

  return (
 
   <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
         {/* App Logo/Image */}
         <Image source={require('../assets/images/fashion4.png')} style={styles.logo} resizeMode="contain" />
 
         <Text style={styles.title}>Login </Text>   
     
         {/* Email Input */}
         <View style={styles.inputContainer}>
           <TextInput
             style={styles.input}
             placeholder="Email"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
           />
         </View>
 
         {/* Password Input */}
         <View style={styles.inputContainer}>
           <TextInput
             style={styles.input}
             placeholder="Password"
             value={password}
             onChangeText={setPassword}
             secureTextEntry
           />
         </View>
 
         
         {/* Signup Button */}
         <TouchableOpacity style={styles.signupButton} onPress={Submit}>
           <Text style={styles.signupButtonText}>Login</Text>
         </TouchableOpacity>
 
       </ScrollView>
     </SafeAreaView>
     
     );
}


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
    height: 120,
    marginBottom: 30,
    alignSelf: 'center',
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
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
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
});


export default Login;
