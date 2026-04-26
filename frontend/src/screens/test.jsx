import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  s,
  vs,
  ms,
} from 'react-native-size-matters';

const ResponsiveScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Responsive App</Text>
          <Text style={styles.subtitle}>Works on all screen sizes!</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://example.com/image.jpg' }}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>Card Title</Text>
          <Text style={styles.cardDescription}>
            This card scales perfectly on all devices.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Secondary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Primary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(50),
  },
  header: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#666',
    lineHeight: moderateScale(22),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: moderateScale(16),
    padding: scale(20),
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: verticalScale(180),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  cardTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(8),
  },
  cardDescription: {
    fontSize: moderateScale(14),
    color: '#666',
    lineHeight: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  primaryButton: {
    flex: 0.48,
    backgroundColor: '#34C759',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 0.48,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default ResponsiveScreen;


// // Always use scaling functions
// padding: scale(16),
// fontSize: moderateScale(16),
// height: verticalScale(50),
// width: scale(343),

//  Screen Size Reference
// The library uses these reference sizes:

// Width: 375px (iPhone 6/7/8)
// Height: 667px (iPhone 6/7/8)