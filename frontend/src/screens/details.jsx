import React from 'react';
import {SafeAreaView, TouchableOpacity,StyleSheet,View,Text,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { back,star } from "../Const/icons";
import { FONTS,SIZES,COLORS } from '../const/colors';
import { Globalstyles } from '../Styles/GobalStyle';
import { CustomButton} from "../Const/Button"
import {  useDispatch, useSelector } from 'react-redux';
import { addMyProducts } from '../ReduxFolder/HomeSlics';

// const { height } = Dimensions.get("window");S

const Details = ({navigation, route}) => {
  const item = route.params;
  const dispatch = useDispatch();
  const CartItems = useSelector(state => state.product);

  
  const SPACING = 10;

    // Header function
    function renderHeader() {
      return (
          <View style={{ flexDirection: 'row', height: 50,marginTop:25 }}>
              {/* Go back */}
              <TouchableOpacity style={styles.go_back}
                  onPress={() => navigation.goBack()}>
                  <Image
                      source={require("../assets/images/arrowleft.png")}
                      resizeMode="contain"
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.black
                      }} />
          
              </TouchableOpacity>

              {/* Category */}
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={styles.category}>
                      <Text style={{ ...FONTS.h2 }}>{item.title}</Text>
                  </View>
              </View>

              {/* Cart */}
            <TouchableOpacity
              style={{
                height: SPACING * 4.7,
                width: SPACING * 4.5,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5}}>
            <View>
               <Text style={{ color:'black', fontSize: 18, fontWeight: 'bold' }}>{CartItems.length}</Text>
            </View>
                 <Icon name="shopping-cart" color={COLORS.dark} size={30} 
                onPress={() => navigation.navigate('cart')}/>
           </TouchableOpacity>      
           
          </View>
      )
  }

   //function for displaying food item information
   function renderFoodInfo() {
    return (
        <>
              <View style={{ alignItems: 'center' }}>
                  <View style={styles.food_image}>

                      {/* Food Image */}
                      <Image
                          source={item.images}
                          resizeMode='contain'
                          style={{
                              width: SIZES.width - 24,
                              height: '85%',
                          }} />

                  </View>
              </View>

              <View style={styles.bottom_container}>

                  {/* Name */}
                  <Text style={styles.name}>{item?.title}</Text>

                  {/* Description */}
                    <Text style={styles.description}>{item?.description}</Text>


                  <View style={styles.row_container}>

                      {/* Price */}
                      <Text style={styles.price}>Rs. {item?.price}</Text>


                  </View>

                  {/* Add to Cart Button */}
                  <View style={{ margin: SIZES.padding * 4, marginTop: 0 }}>
                      <CustomButton text='Add to Cart' onPressButton={() => { dispatch(addMyProducts(item))}} />
                  </View>


              </View>
     </>
      )
  }

//   return (
//       <SafeAreaView style={Globalstyles.container_1}>
//           {renderHeader()}
//           {renderFoodInfo()}
//       </SafeAreaView>
//   )
};


export default Details;


const styles = StyleSheet.create({

  food_image: {
      height: SIZES.height * 0.28,
      marginTop: 50,
      paddingBottom: 10,

  },

  bottom_container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 5,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      shadowOpacity: 0.1,
      shadowRadius: 3,
  },

  name: {
      ...FONTS.h1, textAlign: 'center',
      paddingVertical: SIZES.padding * 2,
      marginHorizontal: SIZES.padding * 3,
      borderBottomColor: COLORS.lightGray3,
      borderBottomWidth: 1
  },

  description: {
      ...FONTS.h4, textAlign: 'center',
      paddingVertical: SIZES.padding * 2,
      marginHorizontal: SIZES.padding * 3,
      color: COLORS.black,
      borderBottomColor: COLORS.lightGray3,
      borderBottomWidth: 1
  },

  row_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: SIZES.padding * 3,
      paddingHorizontal: SIZES.padding * 3,

  },

  duration_text: {
      marginLeft: SIZES.padding,
      ...FONTS.body2,
      color: COLORS.black
  },

  price: {
      marginLeft: SIZES.padding,
      ...FONTS.h2,
      color: COLORS.black
  },

  rating: {
      marginLeft: SIZES.padding,
      ...FONTS.h4
  },

  go_back: {
      width: 50,
      paddingLeft: SIZES.padding * 2,
      justifyContent: 'center'
  },

  category: {
      height: '100%',
      width: '75%',
      backgroundColor: COLORS.lightGray3,
      paddingHorizontal: SIZES.padding * 3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SIZES.radius
  },

  cart: {
      width: 50,
      paddingRight: SIZES.padding * 2,
      justifyContent: 'center'
  }
});