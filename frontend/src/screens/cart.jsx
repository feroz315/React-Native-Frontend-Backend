import { View, Text,TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removetoCart, selectcartItems, selectTotal,addMyCart } from '../state/CartSlics';
import { useNavigation } from '@react-navigation/native';
import { s as tw } from "react-native-wind";
import { customize } from "react-native-wind";

// import * as Icon from "react-native-feather";
import { themeColors } from '../Styles/theme';



export default function Cart() {

    
    const [groupedItems, setGroupedItems] = useState([]);
    
    const basketItems = useSelector(selectcartItems);
    const basketTotal = useSelector(selectTotal);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // customize({
    //     theme: {
    //       colors: {
    //         primarycolor: "#bd2c3d",
    //         secondary: {
    //           light: "#f3f3f3", // Light shade
    //           dark: "#212121", // Dark shade
    //         },
    //       },
    //     },
    //   });

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
    <View>
      {/* top button */}
      <View>
        <TouchableOpacity 
            onPress={navigation.goBack} 
            >
        </TouchableOpacity>
        <View>
            <Text>My Cart</Text>
        </View>
      </View>   

      {/* dishes */}
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







