import { createSlice } from "@reduxjs/toolkit";

export const categorieSlice = createSlice({
    name:"food",
    initialState:[],
    reducers:{
        foodCategory:(state,action) => {
            state.foodCategory = action.payload;
        }
    }
})


export const { foodCategory } = categorieSlice.actions
export const selectfoodCategory = state => state.food.food;
export default categorieSlice.reducer;