import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'; // npm install react-native-vector-icons

const CustomDrawerContent = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // All drawer items
  const drawerItems = [
    { name: 'Home', key: 'Home', icon: 'home-outline' },
    { name: 'Profile', key: 'Profile', icon: 'person-outline' },
    { name: 'Settings', key: 'Settings', icon: 'settings-outline' },
    { name: 'Notifications', key: 'Notifications', icon: 'notifications-outline' },
    { name: 'Help', key: 'Help', icon: 'help-circle-outline' },
  ];

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(drawerItems);
    } else {
      const filtered = drawerItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery]);

  const handleItemPress = (item) => {
    props.navigation.navigate(item.key);
    props.navigation.closeDrawer();
  };

  const renderDrawerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemIconContainer}>
        <Icon name={item.icon} size={24} color="#007AFF" />
      </View>
      <Text style={styles.drawerItemText}>{item.name}</Text>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@example.com</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Icon name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle-outline" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtered Drawer Items */}
      <FlatList
        data={filteredItems}
        renderItem={renderDrawerItem}
        keyExtractor={(item) => item.key}
        style={styles.drawerList}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="help-circle-outline" size={20} color="#666" />
          <Text style={styles.footerText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={[styles.footerText, { color: '#FF3B30' }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  settingsBtn: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  drawerList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  drawerItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
  },
});


export default CustomDrawerContent;