import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: []
}

const MyProductSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
           addProducts: (state, action) => {
            state.product = action.payload;
          }
      },
});



export const { addProducts } = MyProductSlice.actions;
export default MyProductSlice.reducer;