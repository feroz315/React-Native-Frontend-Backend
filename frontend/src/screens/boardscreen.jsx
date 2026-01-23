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

    <PagerView style={styles.pager} initialPage={0}>
    
      <View key="1">
        <Image source={require('../assets/images/one.jpg')} style={styles.image}></Image>
        <Text style={styles.text}>First</Text>
      </View>

      <View key="2">
        <Image source={require('../assets/images/two.jpg')} style={styles.image}></Image>
        <Text style={styles.text}>Second</Text>
      </View>
      
      <View key="3">
        <Image source={require('../assets/images/three.jpg')} style={styles.image}></Image>
        <Text style={styles.text}>Third</Text>

      <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("signup")}>
        <Text style={styles.btntext}>Start Now</Text>
      </TouchableOpacity>

      </View>
      
    </PagerView>
    
  );
};


const styles = StyleSheet.create({
  
  pager: {
    flex: 1,
    margin:20
  },
  
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  image: {
        width: width * 0.90,
        height: 290,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',              
   },
   
   text:{
        fontFamily:"Poppins",
        fontWeight:'600',
        fontSize:32,
        margin:90,
        color:COLORS.navy      
    },
 
    textsmall:{
        fontFamily:"Poppins",
        fontWeight:'400',
        fontSize:17,
        marginTop:3,
        textAlign:'center',
        color:COLORS.navy    

    },
    Btn:{
        width: width * 0.75,
        height:45,
        backgroundColor: COLORS.navy,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop:40,
        marginLeft:50
    },

    btntext:{
        fontSize:16,
        color: COLORS.white,
        textAlign:'center'      
    },


});



export default BoardScreen;