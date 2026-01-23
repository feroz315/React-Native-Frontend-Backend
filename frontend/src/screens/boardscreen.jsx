import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';


// Main BoardScreen component with a pager view containing 3 screens
const BoardScreen = () => {
  return (
    <PagerView style={styles.pager} initialPage={0}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
      <View key="3">
        <Text>Third page</Text>
      </View>
      
    </PagerView>
    
  );
};


const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


export default BoardScreen;