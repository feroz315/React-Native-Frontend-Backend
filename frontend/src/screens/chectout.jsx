// import React from 'react';
// import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const Chectout = () => {
    
//  const navigation = useNavigation()

//     return (
//         <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
//             <Text>check out</Text>
      
//                {/* Signup Button */}
//                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("logout")}>
//                  <Text style={styles.signupButtonText}>payment</Text>
//                </TouchableOpacity>
      
      
      
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     signupButton: {
//     backgroundColor: '#FF6B35', // Orange theme for food app
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginTop: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// })

// export default Chectout;



import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Checkout = () => {

const navigation = useNavigation()

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput style={styles.input} placeholder="Address" />
      <TextInput style={styles.input} placeholder="Payment Info" />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("profile")}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default Checkout;