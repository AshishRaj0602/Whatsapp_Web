import { createSlice } from '@reduxjs/toolkit';

const userSlice= createSlice({
    name: 'user',
    initialState:{
        user:null,
        isLoading:false
    },
    reducers:{
        register:(state,action)=>{
            state.user=action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        }
    }
})
export const {register,setLoading} = userSlice.actions;
export default userSlice.reducer;