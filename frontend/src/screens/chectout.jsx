import React, { useState,useEffect,useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Button,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { COLORS } from '../const/colors';
import {  useSelector } from 'react-redux';
import { selectcartItems, selectTotal } from '../state/CartSlics';



// ⚠️ Replace with your machine’s IP (see “Network gotchas” below)
const API_URL = 'http://192.168.1.3:3000/api/addresses';

// ----- form state -----

const Checkout = ({ navigation }) => {
  
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [Loading, setLoading] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);



  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'applepay', name: 'Apple Pay', icon: 'apple' },
    { id: 'cash', name: 'Cash on Delivery', icon: 'cash' },
  ];

  // Calculate totals
  const subtotal = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;
  
  
  // ----- submit handler -----
  
  const handleSubmit = async () => {
    // Basic validation
    if (!name || !email || !address || !city || !phonenumber || !postalcode || !country) {
      Alert.alert('Validation error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        email,
        address,
        phonenumber,
        city,
        postalcode,
        country,
      };

      // POST the JSON to the Node backend
      const { status, data } = await axios.post(API_URL, payload);

      if (status === 201) {
        Alert.alert('Success', 'Address saved!');
        console.log('Address saved!');
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || 'Network error – try again later.';
      Alert.alert('Error', msg);
     
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setAddress('');
    setPhonenumber('');
    setCity('');
    setPostalcode('');
    setCountry('');
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed Successfully!',
        'Your order has been placed. You will receive a confirmation soon.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('delivery'),
          },
        ]
      );
      clearForm()
    }, 1000);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      Alert.alert('Success', 'Promo code applied successfully!');
    } else {
      Alert.alert('Invalid', 'Please enter a valid promo code');
    }
  };


  useMemo(() => {
    const subtotal = basketItems.reduce((group, item) => {
   
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
      
    }, {});
    setCartItems(subtotal);
    // console.log('items: ',gItems);
  }, [basketItems]);


 return (
    
    <SafeAreaView style={styles.container}>
     
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}
         onPress={() => navigation.goBack()}>
           <Text style={styles.iconText}>←</Text>            
          {/* <Icon name="arrow-back" size={24} color="#333" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
   
      {/* Order Items */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 20,
                  }}>
                  {Object.entries(cartItems).map(([index, item]) => {
                    return (
                      <View key={index} style={styles.cartItem}>
                        <Image source={{uri: item[0].images}} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName} numberOfLines={1}>
                              {item[0]?.title}
                            </Text>
                            <Text style={styles.subtitle}>{item[0].category}</Text>
          
                            {/* Quantity Stepper */}
                          <View style={styles.itemPriceRow}>
                            <Text style={styles.itemPrice}>$ {item[0].price}</Text>
                              <Text style={styles.itemQuantity}>Qty: {item.length}</Text>
                            </View>
                          
                        </View>
                      </View>

                      
                    );
                  })}
                 </ScrollView>
          
        </View>

        {/* Delivery Address */}
         
      <View style = {styles.section}>
        
      
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={setPhonenumber}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalcode}
          onChangeText={setPostalcode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Submit Address"
            onPress={handleSubmit}
            color="#007BFF"
          />
        </View>
        
        </View>
               
        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.selectedPayment,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentLeft}>
                <MaterialCommunityIcons 
                  name={method.icon} 
                  size={24} 
                  color={selectedPayment === method.id ? '#4A90E2' : '#666'} 
                />
                <Text style={[
                  styles.paymentText,
                  selectedPayment === method.id && styles.selectedPaymentText
                ]}>
                  {method.name}
                </Text>
              </View>
              {selectedPayment === method.id && (
                <Icon name="check-circle" size={20} color="#4A90E2" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={applyPromoCode}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${basketTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (8%)</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.discountLabel}>Discount</Text>
              <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${basketTotal + shipping}</Text>
          </View>
        </View>

        {/* Save Information Checkbox*/}
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setSaveInfo(!saveInfo)}
        >
          <View style={[styles.checkbox, saveInfo && styles.checkboxChecked]}>
            {saveInfo && <Icon name="check" size={16} color="#FFF" />}
          </View>
          <Text style={styles.checkboxLabel}>
            Save this information for next time
          </Text>
         </TouchableOpacity>
         
       </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalAmountLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${basketTotal + shipping }</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderButton, Loading && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={Loading}
        >
          <Text style={styles.placeOrderText}>
            {Loading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
       </View>

    </SafeAreaView>
  );
};

// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

 // --- header ---

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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

  // --- section order ---

  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius:10,
    
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemVariants: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginTop:5,
    color: '#4A90E2',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },

  // --- payment ---

  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  selectedPayment: {
    backgroundColor: '#F0F7FF',
  },
  selectedPaymentText: {
    color: '#4A90E2',
    fontWeight: '500',
  },

  // --- promocode ---

  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- summary order ---

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountLabel: {
    fontSize: 14,
    color: '#4CAF50',
  },
  discountValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90E2',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
  },
  
  // --- bottom ---

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalContainer: {
    flex: 1,
  },
  totalAmountLabel: {
    fontSize: 12,
    color: '#999',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0C4DE',
  },
  placeOrderText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },


});

export default Checkout;




