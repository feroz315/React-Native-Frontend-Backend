import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Signup from '../screens/signup';
import Login from '../screens/login';
import Home from './home';
import SplashScreen from './Splash';
import BoardScreen from './boardscreen';



const Stack = createStackNavigator();

const Navigation = () => {

//  const [islogged, setIslogged] = useState(null);


// const checktoken = async () => {
 
//  const token = await AsyncStorage.getItem('token')
 
//   if(token){
//         setIslogged(true)
//     }else{
//         setIslogged(false)
//     }
// }


// useEffect(() => {
//     checktoken();
//  },[])


 return (

   <NavigationContainer>
        
         {/* <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='signup'> */}
         <Stack.Navigator initialRouteName="Splash">
           <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{ headerShown: false }} />
               <Stack.Screen name="Board" component={BoardScreen} />

                 <Stack.Screen name="signup" component={Signup}/>
              <Stack.Screen name='home' component={Home}/>
                 <Stack.Screen name="login" component={Login}/>
        </Stack.Navigator>            
            </NavigationContainer>
        

    );
}




export default Navigation;
