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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    shippingAddress: '',
    items: [
      { name: 'Product 1', quantity: 2, price: 29.99 },
      { name: 'Product 2', quantity: 1, price: 49.99 },
    ],
  });
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://YOUR_SERVER_IP:5000/api/orders/submit', {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        items: formData.items,
        totalAmount: calculateTotal(),
        shippingAddress: formData.shippingAddress,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Order submitted successfully!');
        setFormData({
          customerName: '',
          customerEmail: '',
          shippingAddress: '',
          items: [],
        });
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
      <Text style={styles.title}>Place Your Order</Text>

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

      <View style={styles.itemsSection}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {formData.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>Qty: {item.quantity} x ${item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
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