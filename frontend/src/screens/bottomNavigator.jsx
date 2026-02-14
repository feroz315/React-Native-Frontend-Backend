import React from 'react';
import { View,Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS } from '../const/colors';
import Home from '../screens/home';
import Login from '../screens/login';
import Cart from '../screens/cart';
import Profile from './profile';
import Setting from './setting';





const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 40,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.Teal,
        }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
              <View>
                <Image source={require('../assets/images/home.png')} 
                style={{width:22,height:22,tintColor: focused ? COLORS.Teal : COLORS.dark, }}/>
            </View>

          ),headerShown: false
        }}
      />

      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarStyle: {display: 'none'},  
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../assets/images/home.png')} style={{width:22,height:22,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
              <View>
                <Image source={require('../assets/images/user.png')} style={{width:24,height:24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

              
            // </View>
          ),headerShown: false
        }}
      />
        <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../assets/images/cart.png')} style={{width:22,height:24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),
        }}
      />          
   
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../assets/images/settings.png')} style={{width:20,height:20,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),headerShown: false

        }}
      />
   

    </Tab.Navigator>
  );
};

// appiont
export default BottomNavigator;

