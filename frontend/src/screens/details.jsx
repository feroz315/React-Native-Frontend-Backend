import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS,FONTS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


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
    const URL = `http://192.168.1.8:3000/api/product/${id}`;
    try {
      const res = await axios.get(URL);
      console.log("product", res.data);
      setProduct(res.data);       
    } catch (error) {
      console.log("error", error);
    }
  };
 
  

return (
    <ScrollView>
<View style={styles.container}>
<StatusBar
    translucent
    backgroundColor={Platform.OS === "ios" ? COLORS.primary : COLORS.green}
    barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

   
{product && (
  <View> 
  <Image source={{ uri: product.images }} style={styles.image}/>
  
 <View style={styles.middlecontainer}>
   <View style={styles.ratingWrapper}>

 <View style={styles.ratingWrapper}>
    <Ionicons name="star" size={30} color="#FFD700" />
      <Text style={styles.rating}>4.7
      <Text> (136)</Text>
      </Text>
   </View>    
    <TouchableOpacity>
      <Ionicons name="heart-outline" size={30} color= {COLORS.dark} />
    </TouchableOpacity>
       
   </View>
       <Text style={styles.title}>{product.title}</Text>
      
    <View style={styles.priceWrapper}>
       <Text style={styles.price}>${product.price}</Text> 
    <View style={styles.priceDiscount}>
    <Text style={styles.priceDiscountText}>7% off</Text>
     </View>
    </View>
       <Text style={styles.description}>{product.description}</Text> 
    
    <View style={styles.productVariationWrapper}>
      <View style={styles.productVariationType}>
      <Text style={styles.productVariationTitle}>Color</Text>
    <View style={styles.productVariationValueWrapper}>
      <View style={[styles.productVariationColorValue, {backgroundColor: COLORS.blue}]}/>
      
      <View style={[styles.productVariationColorValue, {backgroundColor: COLORS.green}]}/>
      <View style={[styles.productVariationColorValue, {backgroundColor: COLORS.red}]}/>
     
     </View>
        </View>
     
     <View style={styles.productVariationType}>
     <Text style={styles.productVariationTitle}>Size</Text>
      
 
     <View style={styles.productVariationValueWrapper}>
       <View style={[styles.productVariationSizeValue, {backgroundColor: COLORS.grey}]}>
        <Text style={styles.productVariationSizeValueText}>S</Text>
      </View>

     <View style={styles.productVariationSizeValue}>
        <Text style={styles.productVariationSizeValueText}>M</Text>
       </View>

      <View style={styles.productVariationSizeValue}>
        <Text style={styles.productVariationSizeValueText}>L</Text>
       </View>

     <View style={styles.productVariationSizeValue}>
        <Text style={styles.productVariationSizeValueText}>XL</Text>
       </View>

      </View>
      </View>
    </View>
    
    </View>

    </View>
)}  
   
  </View>
</ScrollView>

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
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.dark,
    letterSpacing:0.6,
    lineHeight:32,
    
  },
  productInfo:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginBottom: 8
  },
  priceWrapper:{
    flexDirection:"row",
    alignItems:"center",
    marginTop: 10,
    gap: 5
  },
  price: {
    fontSize: 15,
    fontWeight:"500",
    color:COLORS.dark
  },
  priceDiscount:{
    backgroundColor: COLORS.lightyellow,
    padding: 5,
    borderRadius: 5
  },
  priceDiscountText:{ 
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.dark
  },
  description: {
    marginTop: 15,
    fontSize: 14,
    fontFamily:FONTS.body5.fontFamily,
    fontWeight: "400",
    color: COLORS.dark,
    letterSpacing: 0.6,
    lineHeight: 20
  },

  middlecontainer:{
    paddingHorizontal: 20
  },

  ratingWrapper:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  marginBottom: 5
  },
  rating:{
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color:COLORS.gray
  },
  productVariationWrapper:{
    flexDirection:'row',
    marginTop:20,
    flexWrap:"wrap"
  },
  productVariationType:{
    width:"50%",
    gap: 5,
    marginBottom: 10
  },
  productVariationTitle:{
    fontSize:16,
    fontWeight:"500",
    color: COLORS.dark,
    
  },
   productVariationValueWrapper:{
    flexDirection:"row",
    alignItems:"center",
    gap: 5,
    flexWrap: "wrap"
  },

  productVariationColorValue:{
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.lightgary
  },

  productVariationSizeValue:{
    width: 50,
    height:30,
    borderRadius:5,
    backgroundColor:COLORS.lightgary,
    justifyContent: "center",
    alignItems:'center',
    borderWidth: 1

  },

  productVariationSizeValueText:{
    fontSize: 12,
    fontWeight: "500",
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


