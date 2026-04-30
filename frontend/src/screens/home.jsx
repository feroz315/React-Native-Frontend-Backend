import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions,SafeAreaView,Text,StyleSheet,FlatList,Image,TouchableOpacity, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { COLORS,SIZES } from '../const/colors';
import { useNavigation } from '@react-navigation/native';
import api from '../config/api';
import {  useSelector } from 'react-redux';
import { selectcartItems } from '../state/CartSlics';
import Carousel from 'react-native-reanimated-carousel';


const { width: screenWidth } = Dimensions.get('window');

const SPACING = 10;

// const { width, height } = Dimensions.get("window").width - 40
const { width } = Dimensions.get('window');


// --- MOCK DATA ---
const categories = [
  { id: '1', name: 'Electronics', icon: 'phone-portrait-outline' },
  { id: '2', name: 'Fashion', icon: 'shirt-outline' },
  { id: '3', name: 'Home', icon: 'home-outline' },
  { id: '4', name: 'Sports', icon: 'fitness-outline' },
  { id: '5', name: 'Beauty', icon: 'flower-outline' },
];

// --- COMPONENTS ---

const CategoryItem = ({ item, active, onPress }) => (
  <TouchableOpacity style={[styles.categoryItem, active && styles.categoryItemActive]}>
    {/* <Icon 
      name={item.icon} 
      size={20} 
      color={active ? '#FFFFFF' : '#8D8D8D'} 
    /> */}
    <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);


const Home = () => {

const [products, setProducts] = useState([]);
const [activeCategory, setActiveCategory] = useState('1');
const [user, setUser] = useState(null);

const cartItems = useSelector(selectcartItems);
const navigation = useNavigation();


 const data = [
    { id: 1, source: require('../assets/images/menhoodi.jpg') },
    { id: 2, source: require('../assets/images/menshirt.jpg') },
    { id: 3, source: require('../assets/images/mentshirt.jpg') },
    { id: 4, source: require('../assets/images/menshoes.jpg')},
    { id: 5, source: require('../assets/images/whiteglasses.jpg')},
    
  ];


// Api data for products Items

  useEffect(() => {
    getdata();
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.log(err, 'Failed');
    }
  };


  const getdata = async () => {
    try {
      const res = await api.get("/allproducts");
      console.log(res.data);
      setProducts(res.data);        
    } catch (error) {
      console.log("error", error)
    }
  };


const options = {
  mediaType: 'photo',
  maxWidth: scale(300),
  maxHeight: verticalScale(400),
  quality: 1,
  includeBase64: false,
};


return (

 <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
      
  <ScrollView showsVerticalScrollIndicator={false} 
  contentContainerStyle={styles.scrollContent}
  >
    
      {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, 👋</Text>
            <Text style={styles.username}>{user?.name} </Text>     
          </View>
      
              <TouchableOpacity
                      style={{
                        height: verticalScale(SPACING * 3.4),
                        width: scale(SPACING * 3.7),
                        marginRight:scale(5),
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(SPACING * 2),
                      }}
                      onPress={() => navigation.navigate('cart')}>
                      
                      <View>
                        <Text style={{color: 'black', fontSize: moderateScale(17), fontWeight: 'bold'}}>
                          {cartItems.length}
                        </Text>
                        
                      </View>         
                    </TouchableOpacity>
          </View>
     
        {/* --- FEATURED BANNER --- */}
  
    <Carousel
        width={screenWidth}
        height={250}
        data={data}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: scale(20),
              
            }}
          >
          <Image 
            source={item.source} 
            style={{ width: scale(330), height: verticalScale(250),borderRadius:moderateScale(15) }} 
          />
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: verticalScale(10) }}>
              Index: {index + 1}
            </Text>
          </View>
        )}
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
      />
  
       {/* --- CATEGORIES --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.seeAll}>See All</Text>
          </View>
     
           <FlatList
               horizontal
               showsHorizontalScrollIndicator={false}
               data={categories}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (
                 <CategoryItem 
                   item={item} 
                   active={activeCategory === item.id}
                   onPress={() => setActiveCategory(item.id)}
                 />
               )}
               contentContainerStyle={styles.categoryList}
             />
      
      {/* --- PRODUCTS --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <Text style={styles.seeAll}>See All</Text>
         </View>

      <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent:"space-between", marginBottom: verticalScale(20) }}
        renderItem={({ index, item }) => (      
        
     <TouchableOpacity style={styles.productCard} onPress={() => {
      navigation.navigate("productdetail", {...item})
      }}>
      <Image source={{ uri: item.images }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productTitle}>{item.title}</Text>
           <View style={styles.productFooter}>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
        
      </View>
    </TouchableOpacity>  
        )}/>
       
    </ScrollView>
     </SafeAreaView>
  );
};



// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: verticalScale(20), // Adjust for status bar
  },
  
  scrollContent: {
    paddingHorizontal: scale(5),
    paddingBottom: verticalScale(50),
  },
  // Header Styles

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },
  greeting: {
    fontSize: moderateScale(16),
    color: '#8D8D8D',
  },
  username: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  
// Category Styles

sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: moderateScale(14),
    color: '#FF6B6B',
    fontWeight: '600',
  },
  categoryList: {
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(5)
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(12),
    marginRight: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryItemActive: {
    backgroundColor: '#FF6B6B',
  },
  categoryText: {
    marginLeft: scale(5),
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#8D8D8D',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },

   // Product Styles
    productCard: {
    width: scale(160),
    height:verticalScale(235),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(25),
    marginLeft:scale(5),
    marginRight:scale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: verticalScale(130),
    resizeMode: 'cover',
  },
  productInfo: {
    padding: verticalScale(8),
  },
  productCategory: {
    fontSize: moderateScale(12),
    color: '#8D8D8D',
    marginBottom: verticalScale(3),
  },
  productTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(8),
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(6),
  },
  ratingText: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    color: '#FFB800',
    marginLeft: scale(2),
  },
  
});



export default Home;













