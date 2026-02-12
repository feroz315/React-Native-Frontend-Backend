import { View, Text,TouchableOpacity, Image, ScrollView } from 'react-native'
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
        
    const gItems = basketItems.reduce((group, item)=>{
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
     
      <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:'center', marginVertical:40 }}>
     
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
                   width: 18,
                   height: 18,
                   tintColor: COLORS.dark,
                 }}/>
                                
             </TouchableOpacity>  
               <Text style={{fontSize:20,fontWeight:"500",color:COLORS.dark,letterSpacing:2,}}>My Cart</Text>
          </View>   

    <ScrollView 
      showsVerticalScrollIndicator={false}
       contentContainerStyle={{
        paddingBottom: 50
       }}>
       
            {
                Object.entries(groupedItems).map(([k, items])=>{
                    return (
                        <View key={k}> 
                                      
                            <Text>{items.length} x </Text>
                            <Image source={items[0]?.images} style={{width:300, height:100}}/>
                            <Text> {items[0]?.title}</Text>
                            
                          <TouchableOpacity 
                                onPress={()=> dispatch(removetoCart({id: items[0]?.id}))}>
                            </TouchableOpacity>
                           <Text>{items[0]?.price}</Text>                            
                          <TouchableOpacity 
                          onPress={()=> dispatch(addMyCart(items[0]))}>
                      </TouchableOpacity>

                        </View>
                    )
                })
            }
        </ScrollView>
        
     {/* total */}
      <View>
            <View>
                <Text>Subtotal</Text>
                <Text>Rs.{basketTotal}</Text>
            </View>
            <View>
                <TouchableOpacity 
                onPress={()=> navigation.replace('OrderScreen')}>
                 <Text>Order Summary</Text>
                </TouchableOpacity>
            </View>
       </View>
    </View>
  )
}






