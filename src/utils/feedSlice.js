import { createSlice } from "@reduxjs/toolkit";

const feesSlice = createSlice({
    name :'feed',
    initialState:null,
    reducers:{
        addFeed:(state , action)=>{
            return action.payload
        },
        removeUserFromFeed:(state , action)=>{
           const newFeed = state.filter((u)=>{
                return u._id !== action.payload
           })
              return newFeed;
        }
    },
})

export const {addFeed, removeUserFromFeed} = feesSlice.actions;
export default feesSlice.reducer;