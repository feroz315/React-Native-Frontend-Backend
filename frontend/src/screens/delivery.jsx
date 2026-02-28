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
    latitude:  24.5576903,
    longitude: 67.088162,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  mapType='standard'
>
<Marker
coordinate={{
  latitude: 24.918803,
  longitude: 67.099762
}} 
pinColor={COLORS.green}
/>
</MapView>
        
</View>
  
    
  </>

    );
}


const styles = StyleSheet.create({})

export default Delivery;
