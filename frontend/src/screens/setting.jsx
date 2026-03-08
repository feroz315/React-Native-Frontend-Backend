import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

// Use 'http://localhost:3000' for Android Emulator

const API_URL = 'http://192.168.1.3:3000/api/setting'; 

const Setting = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Fetch Settings on Load
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/setting`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
      setTheme(response.data.theme_mode);
      setNotifications(response.data.notifications_enabled);
    } catch (error) {
      console.log(error, 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${API_URL}/settings`,
        { theme_mode: theme, notifications_enabled: notifications },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Settings saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          editable={false} // Usually read-only in settings
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Theme Mode</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Light</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={(val) => setTheme(val ? 'dark' : 'light')}
          />
          <Text style={styles.text}>Dark</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <Button 
        title={loading ? "Saving..." : "Save Changes"} 
        onPress={saveSettings} 
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontSize: 16 }
});

export default Setting;