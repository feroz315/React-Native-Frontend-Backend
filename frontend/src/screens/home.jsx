import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions,SafeAreaView,Text,StyleSheet,FlatList,Image,TouchableOpacity, ScrollView } from 'react-native';
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
    { id: 1, source: require('../assets/images/whitehodi.png') },
    { id: 2, source: require('../assets/images/tousre.png') },
    { id: 3, source: require('../assets/images/tshirt.png') },
    { id: 4, source: require('../assets/images/laptop.png')},
    { id: 5, source: require('../assets/images/glasses.png')},
    
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
  maxWidth: 300,
  maxHeight: 400,
  quality: 1,
  includeBase64: false,
};


return (

 <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
      
  <ScrollView showsVerticalScrollIndicator={false}>
    
      {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, 👋</Text>
            <Text style={styles.username}>{user?.name} </Text>     
          </View>
      
              <TouchableOpacity
                      style={{
                        height: SPACING * 4.2,
                        width: SPACING * 4.2,
                        marginRight:5,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SPACING * 2.5,
                      }}
                      onPress={() => navigation.navigate('cart')}>
                      
                      <View>
                        <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                          {cartItems.length}
                        </Text>
                        
                      </View>         
                    </TouchableOpacity>
          </View>
     
        {/* --- FEATURED BANNER --- */}
  
    <Carousel
        width={screenWidth}
        height={235}
        data={data}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.gray,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 18,
              padding: 20,
            }}
          >
          <Image 
            source={item.source} 
            style={{ width: 250, height: 250 }} 
          />
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 10 }}>
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
        columnWrapperStyle={{ justifyContent:"space-between", marginBottom: 20 }}
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
    paddingTop: 20, // Adjust for status bar
  },
  
  // Header Styles

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#8D8D8D',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor:"#FF6B6B",
    borderWidth: 4,
    borderColor: COLORS.navy,
  
  },

  // Category Styles

sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  categoryList: {
    paddingHorizontal: 20,
    marginVertical:5
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
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
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#8D8D8D',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },

 // Banner Styles

 bannerContainer: {
    margin: 20,
    height: 160,
    borderRadius: 20,
    backgroundColor: '#4A4E69',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#FF6B6B',
    width: 100,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bannerImageContainer: {
    width: 120,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Product Styles
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginLeft:10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 12,
    color: '#8D8D8D',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFB800',
    marginLeft: 2,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  }

});



export default Home;













