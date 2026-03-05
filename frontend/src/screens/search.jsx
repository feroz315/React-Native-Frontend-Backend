import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList,TouchableOpacity,Image ,SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Search = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState([]); // Stores all products
  const [filteredData, setFilteredData] = useState([]); // Stores filtered products
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();


  const getproducts = async () => {
    
    const URL = `http://192.168.1.3:3000/api/allproducts`;
    try {
      const res = await axios.get(URL);
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
      <Text style={styles.productDescription}>{item.category}</Text>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        onChangeText={handleSearch}
        value={searchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
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
    paddingTop: 20,
    marginHorizontal: 10,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
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
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  }
});

export default Search;
