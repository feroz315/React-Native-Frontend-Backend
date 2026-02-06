import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';



const { width, height } = Dimensions.get("window");


const Home = () => {
const [products, setProducts] = useState([]);
const navigation = useNavigation();

// Api data for products Items

  const getdata = async () => {
    try {
      const res = await axios.get(`http://192.168.1.12:3000/api/allproducts`, products);
      console.log(res.data);
      setProducts(res.data);
        
    } catch (error) {
      console.log("error", error)
    }
  };

 
  useEffect(() => {
    getdata();
  }, []);


  // Render each clothing item
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('productdetail', { productId: item.id })}>
  //     <Image source={{ uri: item.image }} style={styles.itemImage} />
  //     <Text style={styles.itemName}>{item.title}</Text>
  //     <Text style={styles.itemCategory}>{item.category}</Text>
  //     <Text style={styles.itemPrice}>$ {item.price}</Text>

  //   </TouchableOpacity>
  // );

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


  <Text style={styles.header}> Store</Text>
      <FlatList
        data={products}
        // renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item }) => ( 
        <View>
         <Image source={{ uri: item.images }} style={styles.itemImage} />
         <Text style={styles.itemName}>{item.title}</Text>
        </View>
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
    backgroundColor: '#f5f5f5',
    paddingTop: 70, // Adjust for status bar
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
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  itemImage: {
    width: "100%",
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemCategory: {
    fontSize: 14,
    color: '#888',
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















    
  // const clothesData = [
  //   { id: '1', name: 'T-Shirt', price: '$20', image: 'data:image/jpeg;base64,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' },
  //   { id: '2', name: 'Jeans', price: '$50', image: 'https://via.placeholder.com/150' },
  //   { id: '3', name: 'Jacket', price: '$80', image: 'https://via.placeholder.com/150' },
  //   { id: '4', name: 'Dress', price: '$60', image: 'https://via.placeholder.com/150' },
  //   { id: '5', name: 'Sneakers', price: '$70', image: 'https://via.placeholder.com/150' },
  //   { id: '6', name: 'Hat', price: '$15', image: 'https://via.placeholder.com/150' },
  //   { id: '7', name: 'Sneakers', price: '$70', image: 'https://via.placeholder.com/150' },
  //   { id: '', name: 'Hat', price: '$15', image: 'https://via.placeholder.com/150' },
    
  // ];