
import React from 'react';
import { View,Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../const/colors';
import Home from '../screens/home';
import Signup from '../signup';
import Chectout from './chectout';
import Login from './login';




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
        name="Signup"
        component={Signup}
        options={{
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
              <View>
                <Image source={require('../assets/images/home.png')} style={{width:24,height:24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

              
            // </View>
          ),headerShown: false
        }}
      />
        <Tab.Screen
        name="messge"
        component={Chectout}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../assets/images/home.png')} style={{width:22,height:24,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),
        }}
      />          
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarStyle: {display: 'none'},
          tabBarActiveTintColor:COLORS.Teal,
          tabBarIcon: ({focused}) => (
            <View>
                <Image source={require('../../assets/settings.png')} style={{width:20,height:20,tintColor: focused ? COLORS.Teal : COLORS.dark }}/>
            </View>

          ),headerShown: false

        }}
      />
   */}

    </Tab.Navigator>
  );
};

// appiont
export default BottomNavigator;

