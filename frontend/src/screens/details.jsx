import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");


const ProductDetail = ({ route }) => {

const [product, setProduct] = useState({}); 
const navigate = useNavigation();
const { id } = route.params;


  useEffect(() => {
    ProductgetID();
  }, []);
   

// Api productGetbyId

  const ProductgetID = async () => {
    const URL = `http://192.168.1.10:3000/api/product/${id}`;
    try {
      const res = await axios.get(URL);
      console.log("product", res.data);
      setProduct(res.data);       
    } catch (error) {
      console.log("error", error);
    }
  };
 
  

return (
    
<View style={styles.container}>
<StatusBar
    translucent
    backgroundColor={Platform.OS === "ios" ? COLORS.primary : COLORS.green}
    barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

<View style={{ padding: 20 }}>


      <Image source={{ uri: product.images }} style={styles.image}/>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.title}>{product.currency_code}</Text>
      <Text style={styles.price}> ${product.price}</Text>
      <Text style={{ marginTop: 10 }}>{product.category}</Text>
      <Text style={styles.title}>{product.description}</Text>
      
      {/* Add Image component for product image if available */}
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
   image: {
    width: "80%",
    height: 270,
    borderRadius: 10,
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


