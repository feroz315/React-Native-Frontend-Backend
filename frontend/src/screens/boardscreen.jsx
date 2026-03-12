import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { COLORS } from "../const/colors";
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get("screen");


// Main BoardScreen component with a pager view containing 3 screens
const BoardScreen = () => {
   
const navigation = useNavigation();

  return (

    <View style={styles.pager}>
    
      <View>
        <Image source={require('../assets/images/shopping.png')} style={styles.image}></Image>
        <Text style={styles.text}>Welcome to Ecommerce </Text>
        <Text style={styles.subtext}>Dicover altrative login,signup and forget password and Implement</Text>

        </View>
        
        <View style={styles.twoBtn}>

         <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("login")}>
            <Text style={styles.btntext}>Login</Text>
         </TouchableOpacity>
   
       <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("signup")}>
            <Text style={styles.btntext}>Register Now</Text>
         </TouchableOpacity>
      </View>

      </View>
      
    
    
  );
};


const styles = StyleSheet.create({
  
  pager: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginTop:50,
 
  }, 
 
  image: {
        width: width * 0.75,
        height: 260,
        borderRadius: 10,
        marginLeft: 35,
        marginTop:20,                   
   },
   
   text:{
        fontFamily:"Poppins",
        fontWeight:'bold',
        fontSize:24,
        marginHorizontal:50,
        color:COLORS.navy      
    },

 subtext:{
        fontFamily:"Poppins",
        fontSize:16,
        fontWeight:"500",
        marginHorizontal:45,
        marginTop:5,
        color:COLORS.dark      
    },
    
  twoBtn:{
        marginVertical:150,
        marginLeft:40
    },
 
    Btn:{
        width: width * 0.75,
        height:45,
        backgroundColor: COLORS.navy,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop:20,
    },

    btntext:{
        fontSize:16,
        color: COLORS.white,
        textAlign:'center'      
    },


});



export default BoardScreen;