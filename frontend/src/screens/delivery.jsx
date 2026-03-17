import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import { COLORS } from '../const/colors';


const Delivery = () => {

return (
  <>      
<View style={{flex:1}}>
  <MapView
  style={{flex:1}}
  initialRegion={{
    latitude:  24.9056,
    longitude: 67.0822,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  mapType='standard'
>
<Marker
coordinate={{
  latitude: 24.9056,
  longitude: 67.0822
}} 
pinColor={COLORS.lightOrange}
/>
</MapView>
        
</View>
  
    
  </>

    );
}


const styles = StyleSheet.create({})

export default Delivery;
