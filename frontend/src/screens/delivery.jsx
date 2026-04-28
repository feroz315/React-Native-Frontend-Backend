import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const Delivery = () => {
  const [pins, setPins] = useState([]);
  const [isDroppingPin, setIsDroppingPin] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const onMapPress = (event) => {
    if (!isDroppingPin) return;

    const { coordinate } = event.nativeEvent;
    const newPin = {
      id: Date.now().toString(),
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    };

    setPins([...pins, newPin]);

    // Optional: Show pin details dialog
   
    Toast.show({
    type: 'success', // or 'info'
    text1: 'Pin Dropped!',
    text2: `Location: ${coordinate.latitude.toFixed(6)}, ${coordinate.longitude.toFixed(6)}`,
    position: 'bottom',
    visibilityTime: 2000,
    // Note: Toasts cannot have interactive buttons like "Remove Pin"
    // like an Alert can. For action buttons, stick with Alert.alert().
  });
    
    // Alert.alert(
    //   'Pin Dropped!',
    //   `Location: ${coordinate.latitude.toFixed(6)}, ${coordinate.longitude.toFixed(6)}`,
    //   [
    //     { text: 'OK' },
    //     { text: 'Remove Pin', onPress: () => {
    //         setPins(pins.filter(p => p.id !== newPin.id));
    //       }
    //     }
    //   ]
    // );
  };

  const clearAllPins = () => {
    setPins([]);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Remove on iOS if not using Google Maps
        initialRegion={{         
        latitude:  24.9056,
        longitude: 67.0822,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,

        }}
        onPress={onMapPress}
      >
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            title="Dropped Pin"
            description="User dropped location"
            pinColor="red"
          />
        ))}
       </MapView>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isDroppingPin && styles.activeButton]}
          onPress={() => setIsDroppingPin(!isDroppingPin)}
        >
          <Text style={styles.buttonText}>
            {isDroppingPin ? 'Stop Dropping' : 'Drop Pin'}
          </Text>
        </TouchableOpacity>

        {pins.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={clearAllPins}>
            <Text style={styles.buttonText}>Clear All ({pins.length})</Text>
          </TouchableOpacity>
          
        )}
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace('profile')}>
            <Text style={styles.buttonText}>Dispatch Now</Text>
          </TouchableOpacity>        
        {/* <Button title="Drop Pin" onPress={() => showPinToast(newPin, coordinate)} /> */}

       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: scale(20),
    right: scale(20),
    gap: 10,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#45a049',
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
});

export default Delivery;

