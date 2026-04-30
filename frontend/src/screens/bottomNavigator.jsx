import React from 'react';
import { View,Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS } from '../const/colors';
import Home from '../screens/home';
import Cart from '../screens/cart';
import Profile from './profile';
import Search from './search';




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
        activeTintColor: COLORS.green,
        }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor:COLORS.navy,
          tabBarIcon: ({focused}) => (
              <View>
                <Image source={require('../assets/images/home.png')} 
                style={{width: 22,height: 22,tintColor: focused ? COLORS.navy : COLORS.dark, }}/>
            </View>

          ),headerShown: false
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarActiveTintColor:COLORS.navy,
          tabBarIcon: ({focused}) => (
              <View>
                <Image source={require('../assets/images/user1.png')} style={{width: 24,height: 24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>            
            
          ),headerShown: false
        }}
      />

       <Tab.Screen
        name="Search"
        component={Search}
        options={{
           tabBarActiveTintColor:COLORS.navy,
            tabBarIcon: ({czolor}) => (
            <View>
                <Image source={require('../assets/images/search1.png')}
                 style={{width: 28,height: 28,marginRight:5}}
                 />
            </View>
          ),headerShown: false
        }}
      />
     
        <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarActiveTintColor:COLORS.navy,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../assets/images/shopping-cart.png')} style={{width: 22,height: 24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),headerShown: false
        }}
      />          
   
    </Tab.Navigator>
  );
};


export default BottomNavigator;

    
    