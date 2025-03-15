import { createSlice } from "@reduxjs/toolkit";

const initialState = { // suggested
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  }

  const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        updateForm(state, action){
            const { name , value } = action.payload
            state [name] = value 
        }
    }
        
  })

  export const {
    updateForm 
  } = formSlice.action

  export default formSlice.reducer

 