import {createSlice} from "@reduxjs/toolkit"


const counterSlice = createSlice({
name: "counter",
initialState: {value :  0},
reducers:{
    increment: (state)=>{state.value += 1},
    logData: (state, action)=>{console.log(state, action);
    }
}
})

export const {increment, logData} = counterSlice.actions;
export default counterSlice.reducer;