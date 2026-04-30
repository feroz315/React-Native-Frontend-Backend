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
  Dimensions, 
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { COLORS } from '../const/colors';
import Sound from "react-native-sound";


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
  maxWidth: scale(300),
  maxHeight: verticalScale(400),
  quality: 1,
  includeBase64: false,
};


 // --- Fetch userdata ---
  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
       Toast.show({
       type: 'success', // Type of toast: 'success', 'error', 'info'
       text1: 'Successfully!',  // Main message (header)
       text2: 'profile get successfully!' 
    });
      setUser(res.data);   
    } catch (err) {
      console.log(err, 'Failed '); 
      Toast.show({
       type: 'error',
       text1: 'Validation Error!',
       text2: 'profile Failed!'
     });     
    }
  };

  const handleUpdatePassword = () => {
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
       fetch("http://192.168.1.3:3000/api/logout",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
    }) 
      await AsyncStorage.removeItem('authToken');
      console.log("authtoken")
       Toast.show({
       type: 'success', // Type of toast: 'success', 'error', 'info'
       text1: 'Successfully!',  // Main message (header)
       text2: 'Logout successfully!' 
    });
      navigation.navigate("login")
    
    } catch (error) {
      console.error('Logout error:', error);
      Toast.show({
      type: 'error',
      text1: 'Validation Error!',
      text2: 'Logout Failed! '
    });
           
    }
  };

// Launch image library to select a photo

const selectImage = async () => {
  const result = await launchImageLibrary(options);
  setUserpic(result.assets[0].uri)
  console.log(result.assets[0].uri); // Access the URI of the selected image
  Toast.show({
  type: 'success', // Type of toast: 'success', 'error', 'info'
  text1: 'Successfully!',  // Main message (header)
  text2: 'Image Upload successfully!' 
 });
};

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
        
        <View style={{ height: verticalScale(40) }} /> 
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
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: moderateScale(24),
    borderBottomRightRadius: moderateScale(24),
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
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  avatar: {
    width: scale(60),
    height: verticalScale(50),
    borderRadius: moderateScale(40),
    borderWidth: 4,
    borderColor: COLORS.navy,
  },
  textContainer: {
    flex: 1,
    marginLeft: scale(16),
  },
  userName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: '#666',
    marginTop: verticalScale(2),
  },
  
  editButton: {
    backgroundColor: '#E0F7FA',
    padding: scale(10),
    borderRadius: moderateScale(20),
  },
  
  // Stats Section
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: verticalScale(16),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: scale(20),
    height: verticalScale(20),
    marginBottom: verticalScale(5),
    alignSelf: 'center',
  },
   

  // Menu Section
  menuContainer: {
    marginTop: verticalScale(24),
    paddingHorizontal: scale(20),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: '#F2F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    marginLeft: scale(12),
    flex: 1,
  },
  menuTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop:verticalScale(5)
  },
  menuSubtitle: {
    fontSize: moderateScale(12),
    color: '#999',
    marginTop: verticalScale(2),
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(14),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
  },
  logoutText: {
    color: '#FF5252',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: scale(8),
    marginBottom: verticalScale(5)
  },
});

export default Profile;












