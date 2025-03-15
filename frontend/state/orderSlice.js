import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    size: 'All'
  }

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        updateFilter(state, action){
           state.size = action.payload
        }
    }
})


export const {
    updateFilter
} = filterSlice.actions 

export default filterSlice.reducer