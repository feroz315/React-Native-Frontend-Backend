import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions,SafeAreaView,Text,TextInput ,StyleSheet,FlatList,Image,Alert,TouchableOpacity, ScrollView } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

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
const [userpic, setUserpic] = useState(null);
const [activeCategory, setActiveCategory] = useState('1');
const [user, setUser] = useState(null);

const [searchQuery, setSearchQuery] = useState('');
  

const navigation = useNavigation();
    
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


  // const selectImage = () => {
  //   launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //     if (response.didCancel) return;
  //     if (response.errorMessage) {
  //       Alert.alert('Error', response.errorMessage);
  //       return;
  //     }
  //     uploadImage(response.assets[0]);
  //   });
  // };

  // const uploadImage = async (asset) => {
  //   const formData = new FormData();
  //   formData.append('image', {
  //     uri: asset.uri,
  //     type: asset.type,
  //     name: asset.fileName || 'image.jpg',
  //   });

  //   try {
  //     const response = await axios.post('http://192.168.1.12:3000/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     setUserpic(response)
  //     Alert.alert('Success', 'Image uploaded!');
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //   }
  // };


const options = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 400,
  quality: 1,
  includeBase64: false,
};

// // Launch camera to take a photo
// const takePhoto = async () => {
//   const result = await launchCamera(options);
//   console.log(result.assets[0].uri); // Access the URI of the captured image
// };

// Launch image library to select a photo
const selectImage = async () => {
  const result = await launchImageLibrary(options);
  setUserpic(result.assets[0].uri)
  console.log(result.assets[0].uri); // Access the URI of the selected image
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
          <TouchableOpacity style={styles.profileButton} onPress={selectImage}>
             <Image 
               source={{uri: userpic}}
               style={styles.profileImage}
               />
              </TouchableOpacity>
           </View>

                 
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
     
        {/* --- FEATURED BANNER --- */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Ramzan Sale</Text>
            <Text style={styles.bannerSubtitle}>Up to 35% Off</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageContainer}>
             {/* Placeholder for banner image or just use color */}
             {/* <Icon name="gift" size={60} color="#FFFFFF" opacity={0.5} /> */}
          </View>
        </View>
      
      {/* --- PRODUCTS --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

      <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        // contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent:"space-between", marginBottom: 20 }}
        renderItem={({ index, item }) => (      
        
    //  <View style={styles.productGrid}>
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
          {/* <Icon name="star" size={12} color="#FFB800" /> */}
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
        
      </View>
    </TouchableOpacity>  
        // </View>
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
    borderRadius: 20,
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















