import { View,StyleSheet, Text,TouchableOpacity, Image, FlatList,ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removetoCart, selectcartItems, selectTotal,addMyCart } from '../state/CartSlics';
import { useNavigation } from '@react-navigation/native';
import { COLORS,SIZES } from '../const/colors';
import {back,star,cart } from '../const/icons';



export default function Cart() {

    
    const [groupedItems, setGroupedItems] = useState([]);
    
    const basketItems = useSelector(selectcartItems);
    const basketTotal = useSelector(selectTotal);

    const dispatch = useDispatch();
    const navigation = useNavigation();


    useMemo(() => {
        
    const gItems = basketItems.reduce((group, item) => {
            if(group[item.id]){
              group[item.id].push(item);
            }else{
              group[item.id] = [item];
            }
            return group;
          },{})
        setGroupedItems(gItems);
        // console.log('items: ',gItems);
       
    }, [basketItems])

   
  return (
    
    <View style={{ flex: 1, backgroundColor:"#fff" }}>
      <View style={{flexDirection:"row", alignItems:'center', marginVertical:40 }}>
     
        {/* Go back */}
             <TouchableOpacity
               style={{
                   width: 30,
                   paddingLeft: SIZES.padding * 2,
                   justifyContent: 'center',
                     }}
               onPress={() => navigation.goBack()}>
               <Image
                 source={back}
                 resizeMode="contain"
                 style={{
                   width: 16,
                   height: 16,
                   tintColor: COLORS.dark,
                 }}/>
                                
             </TouchableOpacity>  
               <Text style={{fontSize:20,fontWeight:"500",marginLeft:100,color:COLORS.dark,letterSpacing:2,}}>My Cart</Text>
          </View>   

    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor:COLORS.white, paddingTop: 10}}
       contentContainerStyle={{
        paddingBottom: 50
       }}>
       
            {
                Object.entries(groupedItems).map(([k, items])=>{
                    return (
                        <View key={k}
                        style={{
                        flexDirection:'row',
                        // justifyContent:'space-around',
                        alignItems:'center',
                        width:"95%",
                        height:90,
                        padding: 4,
                        backgroundColor:COLORS.primary,
                        borderRadius: 15,
                        margin:10,
                        
                         }}>
                        
                        <Image source={{ uri: items[0].images }} style={{ width:65,height:70 }}/>
                         <Text style={styles.itemtitle}>{items[0]?.title}</Text>
                          <Text style={{marginLeft:5}}>{items.length} x </Text>
                            
                          <TouchableOpacity
                                style={{ padding:5, }}
                                onPress={()=> dispatch(removetoCart({id: items[0]?.id}))}>
                                <Text style={{fontSize: 20,color:COLORS.dark}}> - </Text> 
                            </TouchableOpacity>

                              <Text style={{fontSize:16, fontWeight:"500"}}>${items[0]?.price}</Text>                            
                                          
                          <TouchableOpacity 
                          style={{ padding:5, }}
                          onPress={()=> dispatch(addMyCart(items[0]))}>
                          <Text style={{fontSize: 20,color:COLORS.dark}}> + </Text> 
                         </TouchableOpacity>
                        </View>
                    )
                })
            }
        </ScrollView>
        
     
      <View style={{ padding: 5, justifyContent:'space-around', backgroundColor:COLORS.white, marginBottom: 70 }}>
            <View style={{ flexDirection:"row", justifyContent:'space-between', marginBottom:5 }}>
                <Text style={{ fontSize:16, fontWeight: "600", color:COLORS.dark }}>Total Amount</Text>
                <Text style={{fontSize:16, fontWeight: "600", color:COLORS.dark}}>${basketTotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                style={{ marginTop:10, padding:5, backgroundColor:COLORS.primary}}
                onPress={()=> navigation.replace('checkout')}>
                 <Text style={{ fontSize:16,fontWeight:"600",color:COLORS.dark,textAlign:'center' }}>Check Out</Text>
                </TouchableOpacity>
            </View>
       </View>
     </View>  
    
 )
} 



const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContainer: { padding: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  itemtitle: {fontSize: 16, fontWeight: 'bold',color: COLORS.dark },
  itemPrice: { fontSize: 16, color: '#888' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  quantity: { fontSize: 18, marginHorizontal: 10 },
  removeButton: { marginLeft: 10 },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  checkoutButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8 },
  checkoutText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, marginBottom: 20 },
  backText: { fontSize: 16, color: '#007bff' },
});


