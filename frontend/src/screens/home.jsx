import { useState, useEffect } from 'react';
import { View,StatusBar, Dimensions,SafeAreaView,Text,TextInput ,StyleSheet,FlatList,Image,Alert,TouchableOpacity, ScrollView } from 'react-native';
import { COLORS,SIZES } from '../const/colors';
import axios from "axios";
import { useNavigation,Link } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';


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
// const [userpic, setUserpic] = useState(null);
const [activeCategory, setActiveCategory] = useState('1');


const navigation = useNavigation();

// Api data for products Items


  useEffect(() => {
    getdata();
  }, []);


  const getdata = async () => {
    const URL = `http://192.168.1.12:3000/api/allproducts`;
    try {
      const res = await axios.get(URL);
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


return (

 <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
    

{/* <View style={styles.topContainer}>
   <View style={styles.topContainerImage}>
    <Text>Hi User!</Text>

    <TouchableOpacity>
     <Image source={require('../assets/images/avatar.png')} style={{ width: 50,height:50}}/>
      </TouchableOpacity>
    </View>
     
 </View> */}

      {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, 👋</Text>
            <Text style={styles.username}>Alex </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
             <Image 
               source={require('../assets/images/avatar.png')}
               style={styles.profileImage} 
             />
          </TouchableOpacity>
        </View>

        {/* --- SEARCH BAR --- */}
        <View style={styles.searchContainer}>
          {/* <Icon name="search" size={20} color="#8D8D8D" style={styles.searchIcon} /> */}
          <TextInput 
            placeholder="Search products..." 
            placeholderTextColor="#8D8D8D"
            style={styles.searchInput}
          />
          <View style={styles.filterButton}>
            {/* <Icon name="options-outline" size={20} color="#FFFFFF" /> */}
          </View>
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
  },

  // Search Styles

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterButton: {
    backgroundColor: '#FF6B6B', // Primary Accent Color
    padding: 10,
    borderRadius: 12,
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

  // card: {
  //   // backgroundColor: COLORS.secondary,
  //   // borderRadius: 10,
  //   // width: 160 ,
  //   // height:260,
  //   // marginVertical: 10,
  //   // marginHorizontal: 5,
  //   // shadowColor: '#000',
  //   // shadowOffset: { width: 0, height: 2 },
  //   // shadowOpacity: 0.2,
  //   // shadowRadius: 3.8,
  //   // elevation: 2, // for Android shadow
  //   // overflow: 'hidden', // for border radius on image
  //   width: '48%',
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 20,
  //   marginBottom: 20,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 5,
  //   elevation: 4,
  //   overflow: 'hidden',
  // },
  //  infoContainer: {
  //   padding: 10,
  // },
  // price: {
  //   fontSize: 14,
  //   color: '#777',
  //   paddingTop: 5,
  // },

  // // header: {
  // //   fontSize:SIZES.h1,
  // //   fontWeight: 'bold',
  // //   textAlign: 'center',
  // //   // margin:20,
  // //   color: '#333',
  // // },
  
  //  listContainer: {
  //   paddingHorizontal: 10,
  // },

  // Containerheader:{
  //   width: width /  2 - 10
  // },
  // // itemContainer: {
  // //   flex: 1,
  // //   margin: 10,
  // //   backgroundColor: 
  // //   borderRadius: 10,
  // //   padding: 10,
  // //   alignItems: 'center',
  // //   shadowColor: '#000',
  // //   shadowOffset: { width: 0, height: 2 },
  // //   shadowOpacity: 0.1,
  // //   shadowRadius: 5,
  // //   elevation: 3, // For Android shadow
  // // },
  // image: {
  //   width: "100%",
  //   height: 150,
  //   resizeMode:"cover",
  //   // borderRadius: 15,
  //   // margin:4,
  //   // marginHorizontal:15
  // },
  // title: {
  //   // fontSize: 12,
  //   // fontWeight: "600",
  //   // color: COLORS.dark,
  //   // letterSpacing:0.6,
  //   // marginBottom: 5,
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   color: '#1A1A1A',
  //   marginBottom: 8,
  // },
  // productInfo:{
  //  flexDirection:'row',
  //  justifyContent:'space-between',
  //  marginBottom: 8
  // },
  // price: {
  //   // fontSize: 14,
  //   // fontWeight:"500",
  //   // color:COLORS.dark
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#FF6B6B',
  // },
  // ratingWrapper:{
  //   flexDirection:'row',
  //   alignItems:'center',
  //   gap: 5 
  // },
  
  // rating:{
  //   fontSize:14,
  //   color:COLORS.dark
  // },
  // category: {
  //   fontSize: 14,
  //   color: COLORS.dark,
  //   // color: '#8D8D8D',
  //   marginBottom: 4,

  // },
  // topContainer:{
  //   // backgroundColor:COLORS.light,     
  //   paddingHorizontal:width*0.03,
  //   zIndex:99,
  //   height:80,
  //   // borderBottomEndRadius:35,
  //   // borderBottomLeftRadius:35, 
  // },

  // topContainerImage:{
  //   flexDirection:'row',
  //   justifyContent:"space-between",
  //   alignItems:'center',
  //   marginTop:20,
  // },

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
});



export default Home;
















