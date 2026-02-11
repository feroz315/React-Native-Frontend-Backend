import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { COLORS } from '../const/colors';


import Signup from '../screens/signup';
import Login from '../screens/login';
import Home from './home';
import SplashScreen from './Splash';
import BoardScreen from './boardscreen';
import BottomNavigator from './bottomNavigator';
import ProductDetail from './details';
import Cart from './cart';



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
        
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
       <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='bottomNav'>
           {/* <Stack.Screen name="Splash" component={SplashScreen} screenOptions={{ headerShown: false }} /> */}
               <Stack.Screen name="board" component={BoardScreen} />
                 <Stack.Screen name="signup" component={Signup}/>
              {/* <Stack.Screen name='home' component={Home}/> */}
               <Stack.Screen name="bottomNav" component={BottomNavigator} />
                 <Stack.Screen name="login" component={Login}/>
                 <Stack.Screen name="productdetail" component={ProductDetail}/>
                 <Stack.Screen name="cart" component={Cart}/>
                 
        </Stack.Navigator>            
            </NavigationContainer>
        

    );
}




export default Navigation;
