import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: []
}

const MyProductSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
           addToCart: (state, action) => {
            state.product = action.payload;
          }
      },
});



export const { addToCart } = MyProductSlice.actions;
export default MyProductSlice.reducer;