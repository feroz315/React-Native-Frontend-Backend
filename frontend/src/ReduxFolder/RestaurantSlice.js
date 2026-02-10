import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resturant: []
}


export const ResturantSlice = createSlice({
  name: 'resturant',
  initialState,
  reducers: {
    addresturant: (state, action) => {
      state.resturant = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addresturant } = ResturantSlice.actions

export default ResturantSlice.reducer;