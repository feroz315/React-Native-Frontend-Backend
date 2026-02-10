
// import { applyMiddleware,createStore, combineReducers  } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import useReducer from "./Reducer";
// // import * as thunk from 'redux-thunk';
// import logger from "redux-logger";


// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
// }


// const rootReducer = combineReducers({
//  userReducer: persistReducer(persistConfig, useReducer)
// });
    


// export const mystore = createStore(rootReducer, applyMiddleware(logger));
// export const persistor = persistStore(mystore);

    
import { configureStore } from '@reduxjs/toolkit'
import MyCartSlice from  '../ReduxFolder/CartSlics';
import  MyProductSlice from '../ReduxFolder/HomeSlics';


export const store = configureStore({
  reducer: {
    product: MyProductSlice,
    cart: MyCartSlice,
    
  },
});



















