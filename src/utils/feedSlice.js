import { createSlice } from "@reduxjs/toolkit";

const feesSlice = createSlice({
    name :'feed',
    initialState:null,
    reducers:{
        addFeed:(state , action)=>{
            return action.payload
        },
        removeFeed:(state , action)=>{
            return null;
        }
    },
})

export const {addFeed} = feesSlice.actions;
export default feesSlice.reducer;