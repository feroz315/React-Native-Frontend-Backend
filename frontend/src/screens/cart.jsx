import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  removetoCart,
  selectcartItems,
  selectTotal,
  addMyCart,
  DeleteMyCart,
} from '../state/CartSlics';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../const/colors';
import {back, star, cart} from '../const/icons';


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const basketItems = useSelector(selectcartItems);
  const basketTotal = useSelector(selectTotal);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // --- Calculations ---
  // const subtotal = basketItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  // const tax = subtotal * 0.08; // 8% tax
  // const shipping = subtotal > 500 ? 0 : 15.00; // Free shipping over $500
  // const total = subtotal + tax + shipping;


  useMemo(() => {
    const gItems = basketItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setCartItems(gItems);
    // console.log('items: ',gItems);
  }, [basketItems]);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

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
          {/* <View style={styles.row}>
                   <Text style={styles.label}>Shipping</Text>
                   <Text style={styles.value}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
                 </View> */}
          {/* <View style={styles.row}>
                   <Text style={styles.label}>Tax (8%)</Text>
                   <Text style={styles.value}>${tax.toFixed(2)}</Text>
                 </View>
                  */}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${basketTotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={()=> navigation.replace('checkout')}>
            <Text style={styles.checkoutBtnText}>Checkout Now</Text>
            {/* <Icon name="arrow-forward" size={20} color="#fff" /> */}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

{
  /*      
      <View style={{ padding: 5, justifyContent:'space-around', backgroundColor:COLORS.white, marginBottom: 70 }}>
            <View style={{ flexDirection:"row", justifyContent:'space-between', marginBottom:5 }}>
                <Text style={{ fontSize:16, fontWeight: "600", color:COLORS.dark }}>Total Amount</Text>
                <Text style={{fontSize:16, fontWeight: "600", color:COLORS.dark}}>${basketTotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                style={{ marginTop:10, padding:5, backgroundColor:COLORS.primary}}
                onPress={()=> navigation.replace('checkout')}>
                 <Text style={{ fontSize:16,fontWeight:"600",color:COLORS.dark,textAlign:'center' }}>Check Out</Text>
                </TouchableOpacity>
            </View>
       </View> */
}


  // // --- Render Empty State ---
  // const renderEmpty = () => (
  //   <View style={styles.emptyContainer}>
  //     {/* <Icon name="cart-outline" size={80} color="#ccc" /> */}
  //     <Text style={styles.emptyText}>Your cart is empty</Text>
  //     <TouchableOpacity style={styles.shopBtn}>
  //       <Text style={styles.shopBtnText}>Start Shopping</Text>
  //     </TouchableOpacity>
  //   </View>
  // );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light gray background
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop:25,
    backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headeritemtext:{
    marginHorizontal:80
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    marginLeft:30
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Space for footer
  },

  // Card Item
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    // marginBottom: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // Stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  stepperBtn: {
    padding: 6,
  },
  qtyText: {
    paddingHorizontal: 10,
    fontSize: 14,
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30, // Safe area padding
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutBtn: {
    backgroundColor: '#000', // Modern Black Button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#888',
  },

  // listContainer: {padding: 10},
  // itemContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   padding: 15,
  //   marginVertical: 5,
  //   borderRadius: 8,
  //   elevation: 2,
  // },
  // itemtitle: {fontSize: 16, fontWeight: 'bold', color: COLORS.dark},
  // itemPrice: {fontSize: 16, color: '#888'},
  // quantityContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 10,
  // },
  // quantity: {fontSize: 18, marginHorizontal: 10},
  // removeButton: {marginLeft: 10},
  // footer: {
  //   padding: 20,
  //   backgroundColor: '#fff',
  //   borderTopWidth: 1,
  //   borderColor: '#ddd',
  // },
  // totalText: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 10,
  // },
  // checkoutButton: {backgroundColor: '#007bff', padding: 15, borderRadius: 8},
  // checkoutText: {color: '#fff', textAlign: 'center', fontSize: 18},
  // // emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // emptyText: {fontSize: 18, marginBottom: 20},
  // backText: {fontSize: 16, color: '#007bff'},
});
