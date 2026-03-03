import React, { useState } from 'react';
import { Dimensions,TextInput,Image,FlatList,SafeAreaView,StyleSheet,Text,View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../const/colors';
import {  useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectcartItems } from '../state/CartSlics';



const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


const Search = () => {

const [ filter,setFilterData ] = useState([]);
const [ search,setSearch ] = useState('');

const cartItems = useSelector(selectcartItems);

const navigation = useNavigation();


const SearchFilter = (text) => {
if(text){
  const searchData = cartItems.filter((item) => {
    console.log("data",searchData)  
   const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase(); 
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  setFilterData(searchData);
  setSearch(text);
}else{
  setFilterData(null);
  setSearch(text);
 }
}
  
  
  return (

     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
                {/* --- SEARCH BAR --- */}
                <View style={styles.searchContainer}>
                  {/* <Icon name="search" size={20} color="#8D8D8D" style={styles.searchIcon} /> */}
                  <TextInput 
                    placeholder="Search products..." 
                    placeholderTextColor="#8D8D8D"
                    value={search}
                    onChangeText={(text) => SearchFilter(text)}
                    style={styles.searchInput}
                  />
                  <View style={styles.filterButton}>
                    {/* <Icon name="options-outline" size={20} color="#FFFFFF" /> */}
                  </View>        
                </View>
                
                    <FlatList
                           data={filter}
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
                          
                   
    
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
 
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

export default Search;