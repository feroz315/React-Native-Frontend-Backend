import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   items: []
} 


const MyCartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addMyCart: (state, action ) => {
           state.items = [...state.items, action.payload]                        
          },
        removetoCart: (state, action ) => {
           let newBasket = [...state.items,];
           let itemIndex = state.items.findIndex(item => item.id == action.payload.id);
          if(itemIndex >= 0){
            newBasket.splice(itemIndex,1)
          }else{
            console.log("can't remove item as its not in the Cart");
          }
            state.items = newBasket
          },
        DeleteMyCart: (state,action ) => { 
            return (state = state.filter(item => item.id !== action.payload));
          },
        emptyCart:(state,action) => {
            state.items = []
          },
         },
    });




export const { addMyCart,removetoCart,DeleteMyCart,emptyCart,addreserve } = MyCartSlice.actions;
export const selectcartItems = state => state.cart.items;
export const selectcartItemsbyId = (state,id) => state.cart.items.filter(item => item.id == id);
export const selectTotal = state => state.cart.items.reduce((total, item) => total = total += item.price,0);
export const seltable = state => state.cart
export default MyCartSlice.reducer;