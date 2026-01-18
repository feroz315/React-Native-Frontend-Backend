import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  View } from 'react-native';
import { TextInput,Text,Button } from 'react-native-paper';



const Login = () => {

const navigation = useNavigation();

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");


   //  const senddata = () => {
   //       console.log(email, password );
   //    }


    return (
   
    <View style={{ flex:0.5, justifyContent:'center',}}>
        <Text variant="displaySmall" style={{ textAlign:'center',marginBottom:50 }}>User Login </Text>
 
   <TextInput
      label="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />

<TextInput
      label="Password"
      value={password}
      style={{marginTop:20}}
      onChangeText={(text) => setPassword(text)}
    />


 <Button style={{marginTop:50}} mode="contained" onPress={() => navigation.navigate('signup')}>
    Submit Login
  </Button>

        </View>

     );
}



export default Login;
