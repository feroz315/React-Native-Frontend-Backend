import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
// import { ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import ModalInput from '../const/modal';
import { COLORS } from '../const/colors';


const { width } = Dimensions.get('window');


const Profile = () => {

const [user, setUser] = useState(null);
const [userpic, setUserpic] = useState(null);

const navigation = useNavigation();


// Api data for products Items

  useEffect(() => {
    fetchProfile();
  }, []);


const options = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 400,
  quality: 1,
  includeBase64: false,
};

 // --- Fetch userdata ---
  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.log(err, 'Failed ');
    }
  };

  const handleUpdatePassword = () => {
    // Alert.alert('Navigation', `Navigating to ${title}`);
    navigation.navigate("changepass")
  };

  const handleContact = () => {
    navigation.navigate("contact")
  };

  const handleEmail = () => {
    navigation.navigate("change-email")
  };

  const handleLogout = async () => {
     try {
       fetch("http://192.168.1.9:3000/api/logout",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
    }) 
      await AsyncStorage.removeItem('authToken');
      console.log("authtoken")
      navigation.navigate("login")
    
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

// Launch image library to select a photo
const selectImage = async () => {
  const result = await launchImageLibrary(options);
  setUserpic(result.assets[0].uri)
  console.log(result.assets[0].uri); // Access the URI of the selected image
};


const showSuccessToast = () => {
  Toast.show({
    type: 'success', // Type of toast: 'success', 'error', 'info'
    text1: 'Successfully!', // Main message (header)
    text2: 'Your operation was successful.' // Optional second line (subheader)
  });
};

// const showErrorToast = () => {
//   Toast.show({
//     type: 'error',
//     text1: 'Error!',
//     text2: 'Something went wrong. Please try again.'
//   });
// };


  // const handleUpdatePassword = async (passwordData) => {
  //   // Your API call here
  //   console.log('Updating password:', passwordData);
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 2000));
    
  //   // Throw error for demo (remove in production)
  //   throw new Error('Invalid current password');
  // };



  return (

    <SafeAreaView style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="#F2F5F8" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header Section --- */}
        <LinearGradient
          colors={['#FFFFFF', '#F2F5F8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          <View style={styles.profileInfo}>
           <TouchableOpacity style={styles.profileButton} onPress={selectImage}>      
            <Image source={{ uri: userpic }} style={styles.avatar} />
            </TouchableOpacity>
            
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
            <Image source={require('../assets/images/compose.png')} style={styles.logo}  />

            </TouchableOpacity>
          </View>
         </LinearGradient>


        {/* --- Menu List Section --- */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleEmail()}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                <Image source={require('../assets/images/email.png')} style={styles.logo}  />

                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Email</Text>
                  {/* <Text style={styles.menuSubtitle}>{user?.email}</Text> */}
                </View>
              </View>
              <Image source={require('../assets/images/compose.png')} style={styles.logo}  />
              
          
            </TouchableOpacity>

          <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleContact()}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                <Image source={require('../assets/images/phone-call.png')} style={styles.logo}  />

                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Contact</Text>
                  {/* <Text style={styles.menuSubtitle}>{user?.email}</Text> */}
                </View>
              </View>
              <Image source={require('../assets/images/compose.png')} style={styles.logo} />       
             </TouchableOpacity>

          <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleUpdatePassword()}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                <Image source={require('../assets/images/exchange.png')} style={styles.logo}  />

                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Currency</Text>
                  {/* <Text style={styles.menuSubtitle}>{user?.email}</Text> */}
                </View>
              </View>
              <Image source={require('../assets/images/compose.png')} style={styles.logo} />       
             </TouchableOpacity>

          <TouchableOpacity 
              style={styles.menuItem}
              
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                <Image source={require('../assets/images/notification.png')} style={styles.logo}  />

                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Notifications</Text>
                  {/* <Text style={styles.menuSubtitle}>{user?.email}</Text> */}
                </View>
              </View>
              <Image source={require('../assets/images/compose.png')} style={styles.logo} />       
             </TouchableOpacity>

          <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleUpdatePassword()}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                <Image source={require('../assets/images/padlock.png')} style={styles.logo}  />

                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>Update Password</Text>
                  {/* <Text style={styles.menuSubtitle}>{user?.email}</Text> */}
                </View>
              </View>
              <Image source={require('../assets/images/compose.png')} style={styles.logo} />       
             </TouchableOpacity>

           </View>

        {/* --- Logout Section --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Image source={require('../assets/images/logout.png')} style={styles.logo}  />

          <Text style={styles.logoutText}>Log Out</Text>
         </TouchableOpacity>
        
        <View style={{ height: 40 }} /> 
      </ScrollView>
     </SafeAreaView>
  );
};





 // --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    // Elevation for Android shadow
    elevation: 4, 
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.navy,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  
  editButton: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 20,
  },
  
  // Stats Section
  statsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 20,
    height: 20,
    marginBottom: 5,
    alignSelf: 'center',
  },
 
  statIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },

  // Menu Section
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  lastMenuItem: {
    marginBottom: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop:5
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom:5
  },
});

export default Profile;












