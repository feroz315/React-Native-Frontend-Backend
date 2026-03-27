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

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Our App!',
    text: 'Discover amazing features designed to make your life easier.',
    image: require('../assets/images/boy.png'),
    colors: {
        backgroundColor: '#F2F5F8',
        textColor: '#000',
    },
  },
  {
    key: '2',
    title: 'Feature 1',
    text: 'Connect with people around the world and share your experiences.',
    image: require('../assets/images/boyshop.png'),
    colors: {
       backgroundColor: '#F2F5F8',
       textColor: '#000',
    },
  },
  {
    key: '3',
    title: 'Feature 2',
    text: 'Track your progress and achieve your goals with our smart tools.',
    image: require('../assets/images/boy.png'),
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
    marginBottom: 60,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#000',
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
    marginBottom:10
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