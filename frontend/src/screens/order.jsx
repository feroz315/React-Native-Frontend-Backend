import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {  useSelector } from 'react-redux';
import { selectcartItems, selectTotal } from '../state/CartSlics';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {CountryPicker} from "react-native-country-codes-picker";

import AsyncStorage from '@react-native-async-storage/async-storage';



const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone:"",
    shippingAddress: '',
    items: basketItems 
  });
  
  const [show, setShow] = useState(false);  
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);


  const handleSubmit = async () => {
    if (!formData.customerName || !formData.customerEmail ||!formData.customerPhone || !formData.shippingAddress) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error!',
          text2: 'Please fill in all required fields.'
        });
        
      return;
    }
    setLoading(true);
    try { 
      const response = await   
       fetch("http://192.168.1.4:3000/api/submit-order",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ 
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,     
        items: basketItems,
        shippingAddress: formData.shippingAddress,
        totalAmount: basketTotal,
       }),       
    }) 
        if (response.ok) {
        console.log('Success', response.ok)
        Toast.show({
         type: 'success', // Type of toast: 'success', 'error', 'info'
         text1: 'Order Placed Successfully!',  // Main message (header)
         text2: 'Order submitted successfully!' 
      });   
        setFormData(response)
        navigation.navigate("delivery")
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          shippingAddress: '',
          items: [],
        });
      } 
    } catch (error) {
      console.error('Order submission error:', error);
       Toast.show({
          type: 'error',
          text1: 'Validation Error!',
          text2: 'Failed to submit order. Please try again.'
        });
       
    } finally {
      setLoading(false);
    }
  };


  return (
    
  <ScrollView style={styles.container}>
        
     {/* Header */}
      <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton}
               onPress={() => navigation.replace("checkout")}>
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
         <View style={styles.containerphone}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '20%',
            height: 50,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ddd',

        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 20,
            marginTop: 10,
            marginLeft: 8
        }}>
            {countryCode}
        </Text>
       </TouchableOpacity>
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
          }}
          inputPlaceholder={"Code"}
      />    
        <TextInput
          style={styles.inputphone}
          value={formData.customerPhone}
          onChangeText={(text) => setFormData({ ...formData, customerPhone: text })}
          placeholder="country code & phone number"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          maxLength={15}
        />
        </View>
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
   
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${basketTotal.toFixed(2)}</Text>
        </View>

      <TouchableOpacity
        style={[styles.submitBtn, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitoutBtnText}>
          {loading ? 'Submitting...' : 'Submit Order'}
        </Text>
        </TouchableOpacity>
         
                 
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    marginTop: verticalScale(15),
    backgroundColor: '#f5f5f5',
  },
  // --- header ---

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    
  },
  headerTitle: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#333',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: moderateScale(20),
    color: '#333',  
  },

  // --- Input ---
 
  containerInput: {
  marginTop:verticalScale(25)
 },
  inputGroup: {
    marginBottom: verticalScale(15),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: scale(15),
    borderRadius: moderateScale(10),
    fontSize: moderateScale(16),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputphone: {
    backgroundColor: 'white',
    padding: scale(15),
    borderRadius: moderateScale(10),
    fontSize: moderateScale(16),
    width:"80%",
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: 'top',
  },
  containerphone:{
    flexDirection:'row',
    alignItems:'center'
  },
  itemsSection: {
    backgroundColor: 'white',
    padding: scale(20),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: moderateScale(16),
    color: '#666',
  },
  totalContainer: {
    backgroundColor: '#000', // Modern Black Button
    padding: scale(15),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(20),
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  totalText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'white',
  },

  submitBtn: {
    backgroundColor: '#000', // Modern Black Button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(15),
    marginTop:verticalScale(5)
  },
  submitoutBtnText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginRight: scale(8),
  }, 
  disabledButton: {
    backgroundColor: '#ccc',
  },

});

export default OrderForm;