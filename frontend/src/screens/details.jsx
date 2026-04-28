import {useState, useEffect} from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  View,
  StatusBar,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../const/colors';
import {useNavigation} from '@react-navigation/native';
import { cart } from '../const/icons';
import {  useDispatch, useSelector } from 'react-redux';
import { addMyCart, selectcartItems } from '../state/CartSlics';
import api from '../config/api';


const SPACING = 10;


const {width, height} = Dimensions.get('window');

const { width: viewportWidth } = Dimensions.get("window");

const ProductDetail = ({route}) => {
  const [product, setProduct] = useState({});
  const navigation = useNavigation();
  const {id} = route.params;

  const dispatch = useDispatch();
   const cartItems = useSelector(selectcartItems);


  useEffect(() => {
    ProductgetID();
  }, [])


  const handleAddToCart = () => {
    dispatch(addMyCart(product)); 
    console.log("add cart", product);
  };
  
  // Api productGetbyId

  const ProductgetID = async () => {
    // const URL = `http://192.168.1.11:3000/api`;
    try {
      const res = await api.get(`/product/${id}`);
      console.log('product', res.data);
      setProduct(res.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {/* {renderHeader()} */}

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" translucent={true} />
        
  
          {/* Header / Navbar */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.iconText}>←</Text>
            </TouchableOpacity>
  
           <Text style={styles.headerTitle}>Product Details</Text>
  
          {/* Cart */}
           <TouchableOpacity
           source={cart}
           style={{
             height: verticalScale(SPACING * 4.2),
             width: scale(SPACING * 4.2),
             marginRight:5,
             backgroundColor: COLORS.white,
             justifyContent: 'center',
             alignItems: 'center',
             borderRadius: moderateScale(SPACING * 2.5),
           }}
           onPress={() => navigation.navigate('cart')}>
           <View>
             <Text style={{color: 'black', fontSize: moderateScale(18), fontWeight: 'bold'}}>
               {cartItems.length}
             </Text>
           </View>         
         </TouchableOpacity>
  
           </View>

        {/* Image */}
   
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images }} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
        </View>
    <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}>
      
        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{product.rating}4.7</Text>
            </View>
                        <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>♡</Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Extra spacing at bottom for the sticky bar */}
          <View style={{ height: verticalScale(100) }} /> 
        </View>
      </ScrollView>


      {/* Sticky Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
            <Text style={styles.bottomPriceLabel}>Total Price</Text>
            <Text style={styles.bottomPrice}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light gray background
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    // backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: verticalScale(20),
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconButton: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: moderateScale(20),
    color: '#333',
  },
  headerTitle: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#333',
  },

  // ScrollView

scrollContent: {
    paddingBottom: verticalScale(20),
  },
  
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: scale('100%'),
    height: verticalScale(280)
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: scale(viewportWidth),
    
  },
  infoContainer: {
    padding: scale(20),
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    marginTop: verticalScale(250), // Overlap effect
    minHeight: verticalScale(height * 0.6),
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  category: {
    fontSize: moderateScale(14),
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: verticalScale(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8f0',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
  },
  starIcon: {
    color: '#FFB800',
    fontSize: moderateScale(14),
    marginRight: scale(4),
  },
  ratingText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#333',
  },
   title: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: verticalScale(10),
    lineHeight: verticalScale(34),
  },
  price: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#FF6F61', // Primary accent color (Coral)
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: '#eee',
    marginVertical: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(12),
  },
  description: {
    fontSize: moderateScale(16),
    color: '#555',
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(20),
  },
    
  // Bottom Bar Styles
  
  bottomBar: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    borderTopWidth: scale(1),
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  priceContainer: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: moderateScale(12),
    color: '#888',
    marginBottom: verticalScale(2),
  },
  bottomPrice: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#1a1a1a', // Black/Dark button
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    borderRadius: moderateScale(12),
    flex: 1.5,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    letterSpacing: scale(0.5),
  },

  // image: {
  //   width: '80%',
  //   height: 350,
  //   borderRadius: 10,
  //   marginHorizontal: 35,
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: '500',
  //   color: COLORS.dark,
  //   letterSpacing: 0.6,
  //   lineHeight: 32,
  // },
  // productInfo: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 8,
  // },
  // priceWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 10,
  //   gap: 5,
  // },
  // price: {
  //   fontSize: 15,
  //   fontWeight: '500',
  //   color: COLORS.dark,
  // },
  // priceDiscount: {
  //   backgroundColor: COLORS.lightyellow,
  //   padding: 5,
  //   borderRadius: 5,
  // },
  // priceDiscountText: {
  //   fontSize: 14,
  //   fontWeight: '500',
  //   color: COLORS.dark,
  // },
  // description: {
  //   marginTop: 15,
  //   fontSize: 14,
  //   fontFamily: FONTS.body5.fontFamily,
  //   fontWeight: '400',
  //   color: COLORS.dark,
  //   letterSpacing: 0.6,
  //   lineHeight: 20,
  // },

  // middlecontainer: {
  //   paddingHorizontal: 20,
  // },

  // ratingWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   marginBottom: 5,
  // },
  // rating: {
  //   marginLeft: 5,
  //   fontSize: 14,
  //   fontWeight: '400',
  //   color: COLORS.gray,
  // },
  // productVariationWrapper: {
  //   flexDirection: 'row',
  //   marginTop: 20,
  //   flexWrap: 'wrap',
  // },
  // productVariationType: {
  //   width: '50%',
  //   gap: 5,
  //   marginBottom: 10,
  // },
  // productVariationTitle: {
  //   fontSize: 16,
  //   fontWeight: '500',
  //   color: COLORS.dark,
  // },
  // productVariationValueWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 5,
  //   flexWrap: 'wrap',
  // },

  // productVariationColorValue: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  //   backgroundColor: COLORS.lightgary,
  // },

  // productVariationSizeValue: {
  //   width: 50,
  //   height: 30,
  //   borderRadius: 5,
  //   backgroundColor: COLORS.lightgary,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  // },

  // productVariationSizeValueText: {
  //   fontSize: 12,
  //   fontWeight: '500',
  //   color: COLORS.dark,
  // },
  // go_back: {
  //   width: 30,
  //   paddingLeft: SIZES.padding * 2,
  //   justifyContent: 'center',
  // },
  // // category: {
  //   // height: '50%',
  //   // width: '50%',
  //   // // backgroundColor: COLORS.lightgary,
  //   // paddingHorizontal: SIZES.padding * 3,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // borderRadius: SIZES.radius
  // },

  // AddtoCart: {
  //   backgroundColor: '#ff9900', // Amazon-style orange
  //   paddingVertical: 12,
  //   marginHorizontal: 60,
  //   width: "60%",
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginVertical: 20,
  // },
  
  // AddtoCartText: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '500',
  // },

});

export default ProductDetail;








