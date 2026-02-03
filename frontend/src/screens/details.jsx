import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");


const ProductDetail = ({ route }) => {

const [product, setProduct] = useState(null); 
const navigate = useNavigation();
const { productId } = route.params;

// Api productGetbyId

  const ProductgetID = async () => {
    try {
      const res = await axios.get(`http://192.168.1.12:3000/api/product${productId}`);
      console.log(res.data);
      setProduct(res.data);       
    } catch (error) {
      console.log("error", error);
    }
  };

 
  useEffect(() => {
    ProductgetID();
  }, []);
   
  

return (
    
<View style={styles.container}>
<StatusBar
    translucent
    backgroundColor={Platform.OS === "ios" ? COLORS.primary : COLORS.green}
    barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

    <View style={{ flex: 1, padding: 20 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.title}</Text>
          <Text>{product.description}</Text>
          <Text>${product.price}</Text>
        </View>
     
    </View>
</View>

  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50, // Adjust for status bar
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
    width: 100,
    height: 100,
    borderRadius: 10,
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



export default ProductDetail;













// };
//   // Render each clothing item
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemContainer} >
//       <Image source={{ uri: item.image }} style={styles.itemImage} />
//       <Text style={styles.itemName}>{item.title}</Text>
//       <Text style={styles.itemCategory}>{item.category}</Text>
//       <Text style={styles.itemPrice}>$ {item.price}</Text>

//     </TouchableOpacity>
//   );


  /* <Text style={styles.header}> Store</Text>
      <FlatList
        data={dataItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display in a 2-column grid
        contentContainerStyle={styles.listContainer}
      />
    </View> */


