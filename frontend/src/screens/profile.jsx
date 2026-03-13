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
  Modal
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





const MENU_ITEMS = [
  { id: '2', title: 'Email', icon: 'heart-outline', subtitle: 'Email Address' },
  { id: '3', title: 'Contact', icon: 'location-outline', subtitle: 'Manage delivery addresses' },
  { id: '4', title: 'Currency', icon: 'card-outline', subtitle: '$ € ¥ £' },
  { id: '5', title: 'Notifications', icon: 'settings-outline', subtitle: 'Conatact Number' },
  { id: '6', title: 'Update Password ', icon: 'help-circle-outline', subtitle: 'Change Password' },

];

const { width } = Dimensions.get('window');


const Profile = () => {

const [user, setUser] = useState(null);
const [userpic, setUserpic] = useState(null);
const [modalVisible, setModalVisible] = useState(false);

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

  const handleMenuPress = (title) => {
    Alert.alert('Navigation', `Navigating to ${title}`);
  };

  const handleLogout = async () => {
     try {
       fetch("http://192.168.1.11:3000/api/logout",{
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


  const handleUpdatePassword = async (passwordData) => {
    // Your API call here
    console.log('Updating password:', passwordData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Throw error for demo (remove in production)
    throw new Error('Invalid current password');
  };

const showModal = () => {
    setModalVisible(true);
  };


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
              <Ionicons name="pencil" size={16} color="#4facfe" />
            </TouchableOpacity>
          </View>
         </LinearGradient>


        {/* --- Menu List Section --- */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => showModal()}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={22} color="#555" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{user?.email}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Logout Section --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={22} color="#FF5252" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
     <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
       <TouchableOpacity
        style={{
           backgroundColor: '#007AFF',
           padding: 16,
           borderRadius: 8,
           alignItems: 'center',
         }}
         onPress={() => setModalVisible(true)}
      >
         <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
           Change Password
         </Text>
       </TouchableOpacity>

       <ModalInput
         visible={modalVisible}
         onClose={() => setModalVisible(false)}
         onUpdatePassword={handleUpdatePassword}
       />
     </View>


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
    borderColor: '#FFFFFF',
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
  statCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 60) / 4, // Responsive width
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  },
});

export default Profile;