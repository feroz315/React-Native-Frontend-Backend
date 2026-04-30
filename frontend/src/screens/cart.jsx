import React, {useMemo, useState} from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  removetoCart,
  selectcartItems,
  selectTotal,
  addMyCart,
  DeleteMyCart,
} from '../state/CartSlics';
import {useNavigation} from '@react-navigation/native';
import { COLORS } from '../const/colors';


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);

  const dispatch = useDispatch();
  const navigation = useNavigation();


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
      
      {/* Header / Navbar */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
      <View style={styles.headeritemtext}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.headerSubtitle}>{basketItems.length} Items</Text>
 
       </View>

        </View>

      {/*--- Render Item */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: COLORS.white, marginVertical: 100}}
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        {Object.entries(cartItems).map(([index, item]) => {
          return (
            <View key={index} style={styles.card}>
              <Image source={{uri: item[0].images}} style={styles.image} />
              <View style={styles.detailsContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item[0]?.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dispatch(DeleteMyCart(item.id))}>
                    {/* <Icon name="trash-outline" size={20} color="#ff3b30" /> */}
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>{item[0].category}</Text>

                <View style={styles.footerRow}>
                  <Text style={styles.price}>$ {item[0].price}</Text>

                  {/* Quantity Stepper */}
                  <View style={styles.stepper}>
                    <TouchableOpacity
                      style={styles.stepperBtn}
                      onPress={() => dispatch(removetoCart({id: item[0].id}))}>
                      <Text style={{fontSize: 20, color: COLORS.dark}}>
                        {' '}
                        -{' '}
                      </Text>
                      {/* <Icon name="remove" size={16} color="#333" /> */}
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.length}</Text>
                    <TouchableOpacity
                      style={styles.stepperBtn}
                      onPress={() => dispatch(addMyCart(item[0]))}>
                      <Text style={{fontSize: 20, color: COLORS.dark}}>
                        {' '}
                        +{' '}
                      </Text>
                      {/* <Icon name="add" size={16} color="#333" /> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
             </View>
          );
        })}
        
        </ScrollView>
  
      {/* Footer / Checkout */}

      {basketItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${basketTotal.toFixed(2)}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${basketTotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={()=> navigation.replace('checkout')}>
            <Text style={styles.checkoutBtnText}>Payment Now</Text>
            </TouchableOpacity>
        </View>
      )}
     
    </SafeAreaView>
  );
}

// --- STYLES ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light gray background
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    marginTop:verticalScale(25),
    backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headeritemtext:{
    marginHorizontal:scale(80)
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
  headerTitle: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: moderateScale(14),
    color: '#888',
    marginTop: verticalScale(4),
    marginLeft:scale(30)
  },
  listContent: {
    padding: scale(16),
    paddingBottom: verticalScale(100), // Space for footer
  },

  // Card Item
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: scale(12),
    marginTop: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: scale(80),
    height: verticalScale(80),
    borderRadius: moderateScale(8),
    backgroundColor: '#eee',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: scale(8),
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: '#888',
    marginTop: verticalScale(2),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333',
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(8),
  },
  stepperBtn: {
    padding: scale(6),
  },
  qtyText: {
    paddingHorizontal: scale(10),
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#333',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30), // Safe area padding
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#888',
  },
  value: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    marginTop: verticalScale(8),
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: verticalScale(16),
  },
  totalLabel: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutBtn: {
    backgroundColor: '#000', // Modern Black Button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom:verticalScale(25)
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginRight: scale(8),
  },

});
