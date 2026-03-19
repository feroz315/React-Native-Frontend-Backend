import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {  useSelector } from 'react-redux';
import { selectcartItems, selectTotal } from '../state/CartSlics';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone:"",
    shippingAddress: '',
    items: basketItems
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);


  const handleSubmit = async () => {
    if (!formData.customerName || !formData.customerEmail ||!formData.customerPhone || !formData.shippingAddress) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setLoading(true);
    try { 
      const response = await   
       fetch("http://192.168.1.10:3000/api/submit-order",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ 
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,     
        items: formData.items,
        shippingAddress: formData.shippingAddress,
        totalAmount: basketTotal,
       }),       
    }) 
      const data = await response.json();       

      if (response.ok) {
        Alert.alert('Success', 'Order submitted successfully!');
        console.log('Success', response.data)
   
        navigation.navigate("delivery")
        setFormData(response.data)
        // setFormData({
        //   customerName: '',
        //   customerEmail: '',
        //   customerPhone: '',
        //   shippingAddress: '',
        //   items: [],
        // });
      } else {
              Alert.alert('Error', data.message);
            }
    } catch (error) {
      console.error('Order submission error:', error);
      Alert.alert('Error', 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
  <ScrollView style={styles.container}>
        
     {/* Header */}
      <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton}
               onPress={() => navigation.goBack()}>
                 <Text style={styles.iconText}>←</Text>            
                {/* <Icon name="arrow-back" size={24} color="#333" /> */}
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Order Place</Text>
              <View style={{ width: 24 }} />    
            
       </View>
          
    <View style={styles.containerInput}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Customer Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.customerName}
          onChangeText={(text) => setFormData({ ...formData, customerName: text })}
          placeholder="Enter your name"
        />
       </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={formData.customerEmail}
          onChangeText={(text) => setFormData({ ...formData, customerEmail: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
       </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          value={formData.customerPhone}
          onChangeText={(text) => setFormData({ ...formData, customerPhone: text })}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Shipping Address *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.shippingAddress}
          onChangeText={(text) => setFormData({ ...formData, shippingAddress: text })}
          placeholder="Enter shipping address"
          multiline
          numberOfLines={4}
        />
       </View>
      </View>
   
      {/* <View style={styles.itemsSection}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {formData.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>Qty: {item.quantity} x ${item.price}</Text>
          </View>
        ))}
      </View> */}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${basketTotal.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit Order'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:15,
    backgroundColor: '#f5f5f5',
  },
  // --- header ---

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: 20,
    color: '#333',  
  },

  // --- Input ---
 
  containerInput: {
  marginTop:25
 },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  itemsSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderForm;