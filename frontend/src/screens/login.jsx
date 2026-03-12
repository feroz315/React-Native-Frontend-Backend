import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Linking
} from 'react-native';
import { COLORS } from "../const/colors";
 
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("screen");


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();


  const Submit = async () => {
   try {      
     fetch("http://192.168.1.7:3000/api/login",{
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
     .then(async (data) => { 
      console.log("login", data.token );
       await AsyncStorage.setItem('authToken', data.token);
       navigation.navigate("bottomNav")
     })
      } catch (e) {
        console.log("error hai",e)
        return { success: false, message: e.res?.data?.message || "Login failed" };
            }

  
  }

  const ForgetPass = async () => {   
    navigation.navigate("forget")
  }
  
  const Signup = async () => {   
    navigation.navigate("signup")
  }
  
const openGmail = () => {
  // Use react-native-email-link or custom linking for a better experience
  Linking.openURL('https://accounts.google.com');
};


  return (
 
   <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
         {/* App Logo/Image */}
         <Image source={require('../assets/images/imagese.png')} style={styles.logo}  />
 
         <Text style={styles.title}>Login</Text>   
    
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
 
         
         {/* Forget Button */}
         <TouchableOpacity onPress={ForgetPass}>
           <Text style={styles.forgetButtonText}>Forgot Password? </Text>
         </TouchableOpacity>
 
         {/* Signup Button */}
         <TouchableOpacity style={styles.signupButton} onPress={Submit}>
           <Text style={styles.signupButtonText}>Login </Text>
         </TouchableOpacity>
   
     <View style={styles.accountsign}>
      <Text style={styles.forgetButtonText}>Don't have an account? </Text>
          <TouchableOpacity onPress={Signup}>    
           <Text style={styles.signupbtn}>Sign Up </Text>
         </TouchableOpacity>
     </View>
   
       <Text style={styles.forgetButtonText}>Or </Text>
   
    {/* Gmail Button */}
     <View style={styles.gmailbtn}>
          <TouchableOpacity style={styles.GmailButton} onPress={openGmail}>
          <Image source={require('../assets/images/gmail.jpg')} style={styles.gmaillogo} />
           <Text style={styles.gmailtext}>Sign in With Google </Text>
         </TouchableOpacity>
     </View>
   
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
    height: 200,
    marginBottom: 5,
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
    marginTop:50,
     
  },
  signupButtonText: {
    fontSize:16,
    color: COLORS.white,
    textAlign:'center'      
 
  },
  forgetButtonText: {
    fontSize:16,
    color: COLORS.navy,
    textAlign:'center'      
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
  accountsign:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    marginVertical:20
  },
  signupbtn:{
    fontSize:15,
    fontWeight:"700",
    color: COLORS.navy,
    textAlign:'center',

  },
  GmailButton: {
    // backgroundColor: '#FF6B35', 
    width: width * 0.75,
    height:45,
    // backgroundColor: COLORS.navy,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 15,
    marginTop:30,
    borderWidth:2,
    borderColor:"#000"
     
  },
 gmailtext:{
    fontSize:16,
    color: COLORS.dark,
    textAlign:'center',
    fontFamily:"Poppins",
         
  },
 gmaillogo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  gmailbtn:{
   flexDirection:'row',
   alignItems:"center",
   justifyContent:'center',
   
  },
});


export default Login;
