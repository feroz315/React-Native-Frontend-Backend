import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import Signup from './signup';
import Login from './login';



const Stack = createStackNavigator();

const Navigation = () => {
    return (

        <NavigationContainer>
        
               <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="signup">
   
                 <Stack.Screen name="signup" component={Signup}/>
                 <Stack.Screen name="login" component={Login}/>
        </Stack.Navigator>            
            </NavigationContainer>
        

    );
}




export default Navigation;
