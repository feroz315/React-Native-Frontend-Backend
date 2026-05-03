import React, {useState, useMemo} from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectcartItems, selectTotal} from '../state/CartSlics';
import {useNavigation} from '@react-navigation/native';



// ----- form state -----

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);

  // Payment methods
  const paymentMethods = [
    {id: 'card', name: 'Credit/Debit Card', icon: 'credit-card'},
    {id: 'paypal', name: 'PayPal', icon: 'paypal'},
    {id: 'cash', name: 'Cash on Delivery', icon: 'cash'},
  ];

  // Calculate totals
  const subtotal = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.99;
  const tax = subtotal * 0.00; // 8% tax
  const discount = tax === 'SAVE10' ? subtotal * 0.1 : 0;
  // const total = subtotal + shipping + tax - discount;

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
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.replace('cart')}>
           <Image source={require("../assets/images/arrowl.png")}
             style={styles.icon}
             /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{width: 24}} />
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
              paddingBottom: 10,
            }}>
            {Object.entries(cartItems).map(([index, item]) => {
              return (
                <View key={index} style={styles.cartItem}>
                  <Image
                    source={{uri: item[0].images}}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item[0]?.title}
                    </Text>
                    <Text style={styles.subtitle}>{item[0].category}</Text>

                    {/* Quantity Stepper */}
                    <View style={styles.itemPriceRow}>
                      <Text style={styles.itemPrice}>$ {item[0].price}</Text>
                      <Text style={styles.itemQuantity}>
                        Qty: {item.length}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            </ScrollView>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.selectedPayment,
              ]}
              onPress={() => setSelectedPayment(method.id)}>
              <View style={styles.paymentLeft}>
                <Image
                  source={require('../assets/images/credit-cards-payment.png')}
                  style={styles.logo}
                  color={selectedPayment === method.id ? '#3B3178' : '#666'}
                />
                <Text
                  style={[
                    styles.paymentText,
                    selectedPayment === method.id && styles.selectedPaymentText,
                  ]}>
                  {method.name}
                </Text>
              </View>
              {selectedPayment === method.id && (
                <Image
                  source={require('../assets/images/check-mark.png')}
                  style={styles.logo}
                />
              )}
            </TouchableOpacity>
          ))}
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
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>$ 0.00</Text>
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

          {/* Bottom Action Button */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.replace('order')}>
            <Text style={styles.checkoutBtnText}>Checkout Now </Text>
          </TouchableOpacity>
        </View>
        
       </ScrollView>
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
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    borderBottomColor: '#E0E0E0',
    marginTop:verticalScale(20)
  },
  headerTitle: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    width: scale(30),
    height: verticalScale(28),
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
icon: {
    width:scale(15),
    height:verticalScale(16),  
  },
  // --- section order ---

  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: moderateScale(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(15),
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: verticalScale(15),
    backgroundColor: '#F8F9FA',
    borderRadius: moderateScale(10),
    padding: scale(10),
  },
  itemImage: {
    width: scale(65),
    height: verticalScale(65),
    borderRadius: moderateScale(8),
    marginRight: scale(12),
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  itemVariants: {
    fontSize: moderateScale(12),
    color: '#999',
    marginBottom: verticalScale(4),
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginTop: verticalScale(5),
    color: '#4A90E2',
  },
  itemQuantity: {
    fontSize: moderateScale(12),
    color: '#666',
  },

  // --- payment ---

  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: moderateScale(14),
    color: '#666',
    marginLeft: scale(12),
  },
  selectedPayment: {
    backgroundColor: '#F0F7FF',
  },
  selectedPaymentText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  logo: {
    width: scale(20),
    height: verticalScale(20),
    marginBottom: verticalScale(5),
    alignSelf: 'center',
  },

  // --- summary order ---

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  summaryLabel: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  summaryValue: {
    fontSize: moderateScale(14),
    color: '#333',
    fontWeight: '500',
  },
  discountLabel: {
    fontSize: moderateScale(14),
    color: '#4CAF50',
  },
  discountValue: {
    fontSize: moderateScale(14),
    color: '#4CAF50',
    fontWeight: '500',
  },
  divider: {
    height: verticalScale(1),
    backgroundColor: '#E0E0E0',
    marginVertical: verticalScale(10),
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#4A90E2',
  },

  // --- bottom ---

  checkoutBtn: {
    backgroundColor: '#000', // Modern Black Button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginRight: scale(8),
  },
});

export default Checkout;
