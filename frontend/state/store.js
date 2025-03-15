import { configureStore } from '@reduxjs/toolkit'
import { orderApi } from './orderApi'
import filterReducer from './orderSlice'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    filterState:filterReducer,                                    
    [orderApi.reducerPath]:orderApi.reducer,
    
    
  },
   
  
  middleware: getDefault => getDefault().concat(
    orderApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
