
// // // --- MOCK DATA ---
// // const categories = [
// //   { id: '1', name: 'Electronics', icon: 'phone-portrait-outline' },
// //   { id: '2', name: 'Fashion', icon: 'shirt-outline' },
// //   { id: '3', name: 'Home', icon: 'home-outline' },
// //   { id: '4', name: 'Sports', icon: 'fitness-outline' },
// //   { id: '5', name: 'Beauty', icon: 'flower-outline' },
// // ];

// // const products = [
// //   {
// //     id: '1',
// //     title: 'Wireless Headphones',
// //     category: 'Electronics',
// //     price: '$199',
// //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
// //     rating: 4.8,
// //   },
// //   {
// //     id: '2',
// //     title: 'Modern Sneakers',
// //     category: 'Fashion',
// //     price: '$89',
// //     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
// //     rating: 4.5,
// //   },
// //   {
// //     id: '3',
// //     title: 'Smart Watch Series 5',
// //     category: 'Electronics',
// //     price: '$299',
// //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
// //     rating: 4.9,
// //   },
// //   {
// //     id: '4',
// //     title: 'Designer Sunglasses',
// //     category: 'Fashion',
// //     price: '$120',
// //     image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
// //     rating: 4.6,
// //   },
// // ];

// // const { width } = Dimensions.get('window');

// // // --- COMPONENTS ---

// // const CategoryItem = ({ item, active, onPress }) => (
// //   <TouchableOpacity style={[styles.categoryItem, active && styles.categoryItemActive]}>
// //     <Icon 
// //       name={item.icon} 
// //       size={20} 
// //       color={active ? '#FFFFFF' : '#8D8D8D'} 
// //     />
// //     <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
// //       {item.name}
// //     </Text>
// //   </TouchableOpacity>
// // );

// // const ProductCard = ({ item }) => (
// //   <View style={styles.productCard}>
// //     <Image source={{ uri: item.image }} style={styles.productImage} />
// //     <View style={styles.productInfo}>
// //       <Text style={styles.productCategory}>{item.category}</Text>
// //       <Text style={styles.productTitle}>{item.title}</Text>
// //       <View style={styles.productFooter}>
// //         <Text style={styles.productPrice}>{item.price}</Text>
// //         <View style={styles.ratingContainer}>
// //           <Icon name="star" size={12} color="#FFB800" />
// //           <Text style={styles.ratingText}>{item.rating}</Text>
// //         </View>
// //       </View>
// //     </View>
// //   </View>
// // );



// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const DetailsScreen = ({ navigation }) => {
//   // Mock Data
//   const product = {
//     title: 'Premium Noise-Cancelling Headphones',
//     price: '$299.00',
//     rating: 4.8,
//     reviews: 124,
//     category: 'Electronics',
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
//     description: 'Experience immersive sound with our latest noise-cancelling technology. These headphones feature 30-hour battery life, plush ear cushions for all-day comfort, and seamless Bluetooth connectivity.',
//     features: [
//       'Active Noise Cancellation',
//       '30-Hour Battery Life',
//       'Bluetooth 5.0',
//       'Built-in Microphone',
//     ],
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
//       {/* Header / Navbar */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.iconText}>←</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <Text style={styles.iconText}>♡</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Hero Image */}
//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: product.image }} 
//             style={styles.heroImage} 
//             resizeMode="cover"
//           />
//         </View>

//         {/* Product Info */}
//         <View style={styles.infoContainer}>
//           <View style={styles.categoryRow}>
//             <Text style={styles.category}>{product.category}</Text>
//             <View style={styles.ratingContainer}>
//               <Text style={styles.starIcon}>★</Text>
//               <Text style={styles.ratingText}>{product.rating}</Text>
//               <Text style={styles.reviewCount}>({product.reviews})</Text>
//             </View>
//           </View>

//           <Text style={styles.title}>{product.title}</Text>
//           <Text style={styles.price}>{product.price}</Text>

//           <View style={styles.divider} />

//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.description}>{product.description}</Text>

//           <Text style={styles.sectionTitle}>Key Features</Text>
//           {product.features.map((feature, index) => (
//             <View key={index} style={styles.featureItem}>
//               <Text style={styles.bulletPoint}>•</Text>
//               <Text style={styles.featureText}>{feature}</Text>
//             </View>
//           ))}
          
//           {/* Extra spacing at bottom for the sticky bar */}
//           <View style={{ height: 100 }} /> 
//         </View>
//       </ScrollView>

//       {/* Sticky Bottom Action Bar */}
//       <View style={styles.bottomBar}>
//         <View style={styles.priceContainer}>
//             <Text style={styles.bottomPriceLabel}>Total Price</Text>
//             <Text style={styles.bottomPrice}>{product.price}</Text>
//         </View>
//         <TouchableOpacity style={styles.addToCartButton}>
//           <Text style={styles.addToCartText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa', // Light gray background
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#f8f9fa',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3, // Android shadow
//     shadowColor: '#000', // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   iconText: {
//     fontSize: 20,
//     color: '#333',
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     width: width,
//     height: width * 0.9, // Square-ish aspect ratio
//     backgroundColor: '#fff',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//   },
//   infoContainer: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -30, // Overlap effect
//     minHeight: height * 0.6,
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   category: {
//     fontSize: 14,
//     color: '#888',
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff8f0',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   starIcon: {
//     color: '#FFB800',
//     fontSize: 14,
//     marginRight: 4,
//   },
//   ratingText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   reviewCount: {
//     fontSize: 12,
//     color: '#888',
//     marginLeft: 2,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//     marginBottom: 10,
//     lineHeight: 34,
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FF6F61', // Primary accent color (Coral)
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     marginBottom: 8,
//     alignItems: 'flex-start',
//   },
//   bulletPoint: {
//     fontSize: 16,
//     color: '#FF6F61',
//     marginRight: 10,
//     lineHeight: 24,
//   },
//   featureText: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//     lineHeight: 24,
//   },
  
//   // Bottom Bar Styles
//   bottomBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   priceContainer: {
//     flex: 1,
//   },
//   bottomPriceLabel: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 2,
//   },
//   bottomPrice: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   addToCartButton: {
//     backgroundColor: '#1a1a1a', // Black/Dark button
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     flex: 1.5,
//     alignItems: 'center',
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     letterSpacing: 0.5,
//   },
// });

// export default DetailsScreen;








import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Mock Data ---
const MOCK_CART = [
  {
    id: '1',
    title: 'Nike Air Max 270',
    size: 'US 9',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    qty: 1,
  },
  {
    id: '2',
    title: 'Sony WH-1000XM4',
    size: 'Wireless',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    qty: 1,
  },
  {
    id: '3',
    title: 'Apple Watch Series 6',
    size: '44mm',
    price: 399.00,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    qty: 1,
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(MOCK_CART);

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 500 ? 0 : 15.00; // Free shipping over $500
  const total = subtotal + tax + shipping;

  // --- Actions ---
  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0)); // Optional: Auto-remove if 0
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', onPress: () => setCartItems(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  // --- Render Item ---
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Icon name="trash-outline" size={20} color="#ff3b30" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{item.size}</Text>
        
        <View style={styles.footerRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          
          {/* Quantity Stepper */}
          <View style={styles.stepper}>
            <TouchableOpacity 
              style={styles.stepperBtn} 
              onPress={() => updateQty(item.id, -1)}
            >
              <Icon name="remove" size={16} color="#333" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.qty}</Text>
            <TouchableOpacity 
              style={styles.stepperBtn} 
              onPress={() => updateQty(item.id, 1)}
            >
              <Icon name="add" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // --- Render Empty State ---
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <TouchableOpacity style={styles.shopBtn}>
        <Text style={styles.shopBtnText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.headerSubtitle}>{cartItems.length} Items</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer / Checkout */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tax (8%)</Text>
            <Text style={styles.value}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutBtnText}>Checkout Now</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: -4 },
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
}
});
