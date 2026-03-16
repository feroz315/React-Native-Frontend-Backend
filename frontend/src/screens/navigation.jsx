import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import Chectout from './chectout';
import Logout from './logout';
import Profile from './profile';
import Delivery from './delivery';
import ForgotPassword from './forgetpass';
import ResetPassword from './resetpass';
import ChangePassword from './changepass';
import ProfileContact from './contact';
import ChangeEmail from './changeEmail';





const Stack = createStackNavigator();

const Navigation = () => {


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
                 <Stack.Screen name="checkout" component={Chectout}/>
                 <Stack.Screen name="logout" component={Logout}/>
                <Stack.Screen name="profile" component={Profile}/>
               <Stack.Screen name="delivery" component={Delivery}/>
               <Stack.Screen name="forget" component={ForgotPassword}/>
               <Stack.Screen name="reset" component={ResetPassword}/>
                <Stack.Screen name="changepass" component={ChangePassword}/>
                 <Stack.Screen name="contact" component={ProfileContact}/>
                 <Stack.Screen name="change-email" component={ChangeEmail}/>
                 

        </Stack.Navigator>            
            </NavigationContainer>
        

    );
}




export default Navigation;
