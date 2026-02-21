import React, { useState } from 'react';
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
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkout = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      size: 'M',
      color: 'White',
      price: 29.99,
      quantity: 2,
      image: 'https://via.placeholder.com/60x60',
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      size: '32',
      color: 'Blue',
      price: 79.99,
      quantity: 1,
      image: 'https://via.placeholder.com/60x60',
    },
  ];

  // Sample addresses
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '+1 234 567 8900',
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      phone: '+1 234 567 8901',
    },
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'applepay', name: 'Apple Pay', icon: 'apple' },
    { id: 'cash', name: 'Cash on Delivery', icon: 'cash' },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Order Placed Successfully!',
        'Your order has been placed. You will receive a confirmation soon.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OrderConfirmation'),
          },
        ]
      );
    }, 2000);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      Alert.alert('Success', 'Promo code applied successfully!');
    } else {
      Alert.alert('Invalid', 'Please enter a valid promo code');
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemVariants}>
          Size: {item.size} | Color: {item.color}
        </Text>
        <View style={styles.itemPriceRow}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  const AddressModal = () => (
    <Modal
      visible={showAddressModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Delivery Address</Text>
            <TouchableOpacity onPress={() => setShowAddressModal(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.addressItem,
                  selectedAddress === index && styles.selectedAddress,
                ]}
                onPress={() => {
                  setSelectedAddress(index);
                  setShowAddressModal(false);
                }}
              >
                <View style={styles.addressHeader}>
                  <Text style={styles.addressType}>{item.type}</Text>
                  {selectedAddress === index && (
                    <Icon name="check-circle" size={20} color="#4CAF50" />
                  )}
                </View>
                <Text style={styles.addressName}>{item.name}</Text>
                <Text style={styles.addressText}>{item.street}</Text>
                <Text style={styles.addressText}>
                  {item.city}, {item.state} {item.zip}
                </Text>
                <Text style={styles.addressPhone}>{item.phone}</Text>
              </TouchableOpacity>
            )}
          />
          
          <TouchableOpacity style={styles.addAddressButton}>
            <Icon name="add" size={20} color="#FFF" />
            <Text style={styles.addAddressText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setShowAddressModal(true)}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.addressCard}
            onPress={() => setShowAddressModal(true)}
          >
            <View style={styles.addressIcon}>
              <Icon 
                name={addresses[selectedAddress].type === 'Home' ? 'home' : 'work'} 
                size={20} 
                color="#4A90E2" 
              />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressTypeText}>
                {addresses[selectedAddress].type}
              </Text>
              <Text style={styles.addressFull}>
                {addresses[selectedAddress].street}
              </Text>
              <Text style={styles.addressFull}>
                {addresses[selectedAddress].city}, {addresses[selectedAddress].state} {addresses[selectedAddress].zip}
              </Text>
              <Text style={styles.addressPhone}>
                {addresses[selectedAddress].phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            scrollEnabled={false}
          />
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
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
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
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Save Information Checkbox */}
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
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderButton, isLoading && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          <Text style={styles.placeOrderText}>
            {isLoading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address Modal */}
      <AddressModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
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
  changeText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addressFull: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
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
    color: '#4A90E2',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addressItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedAddress: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F7FF',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  addressName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  addAddressButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addAddressText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Checkout;