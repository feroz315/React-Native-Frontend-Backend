import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Chectout = () => {
    
 const navigation = useNavigation()

    return (
        <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
            <Text>check out</Text>
      
               {/* Signup Button */}
               <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("login")}>
                 <Text style={styles.signupButtonText}>Logout</Text>
               </TouchableOpacity>
      
      
      
        </View>
    );
}

const styles = StyleSheet.create({
    signupButton: {
    backgroundColor: '#FF6B35', // Orange theme for food app
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Chectout;
