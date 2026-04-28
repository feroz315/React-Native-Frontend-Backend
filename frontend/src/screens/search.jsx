import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList,TouchableOpacity,Image ,SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../config/api';
import { COLORS } from '../const/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const Search = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState([]); // Stores all products
  const [filteredData, setFilteredData] = useState([]); // Stores filtered products
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();


  const getproducts = async () => {
    
    try {
      const res = await api.get('/allproducts');
      console.log(res.data);
      setFullData(res.data);
        
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const formattedQuery = text.toLowerCase();
      const newData = fullData.filter(item => {
        // Filter by name or description
        return item.title.toLowerCase().includes(formattedQuery) || 
               item.description.toLowerCase().includes(formattedQuery);
      });
      setFilteredData(newData);
    } else {
      setFilteredData('');
           
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} 
     onPress={() => navigation.navigate("productdetail", {...item})}>
      <Image source={{ uri: item.images }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productcategory}>{item.category}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      
    </TouchableOpacity>
  );


  useEffect(() => {
    setFullData(fullData);
    setFilteredData(fullData);
    setIsLoading(false);
    getproducts();
    
  }, []);

  if (isLoading) {
    return <Text>Loading products...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
       {/* --- SEARCH BAR --- */}
      <View style={styles.searchContainer}>      
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        onChangeText={handleSearch}
        value={searchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
       <View style={styles.filterButton}>
            {/* <Icon name="options-outline" size={20} color="#FFFFFF" /> */}
          </View>        
        </View>

      <FlatList
        data={filteredData}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noResults}>No products found.</Text>}
      />
    </SafeAreaView>       


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(20),
    marginHorizontal: scale(10),
  },
  // Search Styles

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(15),
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(15),
    height: verticalScale(55),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#1A1A1A',
  },
  filterButton: {
    backgroundColor: '#FF6B6B', // Primary Accent Color
    padding: scale(10),
    borderRadius: moderateScale(12),
  },
  itemContainer:{
    alignItems:'center',
    margin:scale(10)
  },
  productName: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    margin:scale(5),
    fontFamily:"Poppins",
  },
  productDescription: {
    fontSize: moderateScale(13),
    color: COLORS.dark,
    fontFamily:"Poppins",
    margin:scale(3),
    letterSpacing: 1
  },
   productcategory:{
    fontSize: moderateScale(15),
    fontWeight:"600",
    color: COLORS.dark,
    fontFamily:"Poppins",
    margin:scale(3), 
   },
 
  productImage: {
    width: scale('50%'),
    height: verticalScale(150),
    resizeMode: 'cover',
  },
  noResults: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: moderateScale(16),
  }
});

export default Search;
