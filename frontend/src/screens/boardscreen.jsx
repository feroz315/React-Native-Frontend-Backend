// import React from 'react';
// import { View, Text, TouchableOpacity, Dimensions, StyleSheet,Image } from 'react-native';
// import { COLORS } from "../const/colors";
// import { useNavigation } from '@react-navigation/native';


// const { width } = Dimensions.get("screen");


// // Main BoardScreen component with a pager view containing 3 screens
// const BoardScreen = () => {
   
// const navigation = useNavigation();

//   return (

//     <View style={styles.pager}>
    
//       <View>
//         <Image source={require('../assets/images/shopping.png')} style={styles.image}></Image>
//         <Text style={styles.text}>Welcome to Ecommerce </Text>
//         <Text style={styles.subtext}>Dicover altrative login,signup and forget password and Implement</Text>

//         </View>
        
//         <View style={styles.twoBtn}>

//          <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("login")}>
//             <Text style={styles.btntext}>Login</Text>
//          </TouchableOpacity>
   
//        <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("signup")}>
//             <Text style={styles.btntext}>Register Now</Text>
//          </TouchableOpacity>
//       </View>

//       </View>
      
    
    
//   );
// };


// const styles = StyleSheet.create({
  
//   pager: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     marginTop:50,
 
//   }, 
 
//   image: {
//         width: width * 0.75,
//         height: 260,
//         borderRadius: 10,
//         marginLeft: 35,
//         marginTop:20,                   
//    },
   
//    text:{
//         fontFamily:"Poppins",
//         fontWeight:'bold',
//         fontSize:24,
//         marginHorizontal:50,
//         color:COLORS.navy      
//     },

//  subtext:{
//         fontFamily:"Poppins",
//         fontSize:16,
//         fontWeight:"500",
//         marginHorizontal:45,
//         marginTop:5,
//         color:COLORS.dark      
//     },
    
//   twoBtn:{
//         marginVertical:150,
//         marginLeft:40
//     },
 
//     Btn:{
//         width: width * 0.75,
//         height:45,
//         backgroundColor: COLORS.navy,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: 'center',
//         borderRadius: 20,
//         marginTop:20,
//     },

//     btntext:{
//         fontSize:16,
//         color: COLORS.white,
//         textAlign:'center'      
//     },


// });



// export default BoardScreen;

// // AppIntroScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS } from '../const/colors';


const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Our App!',
    text: 'Discover unique products make your life easier.',
    image: require('../assets/images/store.png'),
    colors: {
        backgroundColor: '#F2F5F8',
        textColor: '#000',
    },
  },
  {
    key: '2',
    title: 'Browse thousands of product in one place',
    text: 'Browse by item brand category or by your favourite eshop.',
    image: require('../assets/images/shopp.png'),
    colors: {
       backgroundColor: '#F2F5F8',
       textColor: '#000',
    },
  },
  {
    key: '3',
    title: 'Choose your preferred payment method',
    text: 'Choose mobile online money, visa or cash on delivery.',
    image: require('../assets/images/payment.png'),
    colors: {
      backgroundColor: '#F2F5F8',
      textColor: '#000',
    },
  },
    {
    key: '4',
    title: 'Confirm your order and await delivery',
    text: 'Choose from wide a range or deliver options eshop, pickup point or at doorstep.',
    image: require('../assets/images/order.png'),
    colors: {
      backgroundColor: '#F2F5F8',
      textColor: '#000',
    },
  },

];

const BoardScreen = ({ navigation }) => {
  const _renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.colors.backgroundColor,
          },
        ]}
      >
        <Image
          source={ item.image }
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </View>
    );
  };

  const onSlideChange = (index) => {
    console.log('slide changed', index);
  };

  const onDone = () => {
    navigation.replace('login'); // Navigate to main app
  };

  const onSkip = () => {
    navigation.replace('login'); // Navigate to main app
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onSlideChange={onSlideChange}
      onDone={onDone}
      onSkip={onSkip}
      showSkipButton={true}
      showNextButton={true}
      showDoneButton={true}
      bottomButton
      activeDotStyle={styles.activeDot}
      inactiveDotStyle={styles.inactiveDot}
      dotStyle={styles.dot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: COLORS.navy,
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  doneButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skipButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    
  },
  dot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 12,
    height: 12,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

export default BoardScreen;