import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions, Text, StyleSheet,FlatList,Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation,Link } from '@react-navigation/native';


const { width, height } = Dimensions.get("window").width - 40


const Home = () => {
const [products, setProducts] = useState([]);
const navigation = useNavigation();

// Api data for products Items


  useEffect(() => {
    getdata();
  }, []);


  const getdata = async () => {
    const URL = `http://192.168.1.10:3000/api/allproducts`;
    try {
      const res = await axios.get(URL);
      console.log(res.data);
      setProducts(res.data);
        
    } catch (error) {
      console.log("error", error)
    }
  };

 

return (

<View style={styles.container}>
<StatusBar
    translucent
    backgroundColor={Platform.OS === "ios" ? COLORS.primary : COLORS.green}
    barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

<View style={styles.topContainer}>
   <View style={styles.topContainerImage}>
    <Text>Hi User!</Text>
    <TouchableOpacity>
     <Image source={require('../assets/images/avatar.png')} style={{ width: 50,height:50}}/>
      </TouchableOpacity>
    </View>
     
 </View>


  <Text style={styles.header}> Store Product</Text>
  
      <FlatList
        data={products}
        // renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent:"space-between", marginBottom: 20 }}
        renderItem={({ index, item }) => ( 
        
           

  <TouchableOpacity style={styles.card} onPress={() => {
      navigation.navigate("productdetail", {...item})
      }}>
      <Image source={{ uri: item.images }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
        
        
        )}

        numColumns={2} // Display in a 2-column grid
        contentContainerStyle={styles.listContainer}
      />
  
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    // paddingTop: 70, // Adjust for status bar
  },
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 160 ,
    height:260,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 2, // for Android shadow
    overflow: 'hidden', // for border radius on image
  },
   infoContainer: {
    padding: 10,
  },
  price: {
    fontSize: 14,
    color: '#777',
    paddingTop: 5,
  },

  header: {
    fontSize:SIZES.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    // margin:20,
    color: '#333',
  },
  
   listContainer: {
    paddingHorizontal: 10,
  },

  Containerheader:{
    width: width /  2 - 10
  },
  // itemContainer: {
  //   flex: 1,
  //   margin: 10,
  //   backgroundColor: 
  //   borderRadius: 10,
  //   padding: 10,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   elevation: 3, // For Android shadow
  // },
  image: {
    width: "70%",
    height: 150,
    borderRadius: 15,
    margin:4,
    marginHorizontal:15
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.dark,
    letterSpacing:0.6,
    marginBottom: 5,
  },
  productInfo:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginBottom: 8
  },
  price: {
    fontSize: 14,
    fontWeight:"500",
    color:COLORS.dark
  },
  ratingWrapper:{
    flexDirection:'row',
    alignItems:'center',
    gap: 5 
  },
  rating:{
    fontSize:14,
    color:COLORS.dark
  },
  category: {
    fontSize: 15,
    fontWeight:"500",
    color: COLORS.dark,
    marginBottom:5
  },
  topContainer:{
    // backgroundColor:COLORS.light,     
    paddingHorizontal:width*0.03,
    zIndex:99,
    height:80,
    // borderBottomEndRadius:35,
    // borderBottomLeftRadius:35, 
  },

  topContainerImage:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:20,
  },
});



export default Home;











// import React from 'react';
// import { View, Button, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';

// const ImageUpload = () => {
//   const selectImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.didCancel) return;
//       if (response.errorMessage) {
//         Alert.alert('Error', response.errorMessage);
//         return;
//       }
//       uploadImage(response.assets[0]);
//     });
//   };

//   const uploadImage = async (asset) => {
//     const formData = new FormData();
//     formData.append('image', {
//       uri: asset.uri,
//       type: asset.type,
//       name: asset.fileName || 'image.jpg',
//     });

//     try {
//       const response = await axios.post('http://your-server-ip:3000/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       Alert.alert('Success', 'Image uploaded!');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View>
//       <Button title="Select Image" onPress={selectImage} />
//     </View>
//   );
// };

// export default ImageUpload;







