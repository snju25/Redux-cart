import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems',
async (name, ) => {
    try{
        const resp = await axios(url)
        return resp.data
    }catch(error){
        return error

    }
    
  });

const initialState = {
    cartItems : [],
    amount: 1,
    total: 0,
    isLoading: true,
}



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems=[]
        },
        removeItem: (state,action)=>{
            const itemID = action.payload
            state.cartItems = state.cartItems.filter(item=> item.id !== itemID)
            console.log(state, action)

        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        
          },
          decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
          },
          calculateTotal : (state,action)=>{
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item)=>{
                amount += item.amount
                total+= amount * item.price;
            })
            state.amount = amount
            state.total = total
          }
    }, 
    extraReducers: (builder) => {
        builder 
        .addCase(getCartItems.pending,  (state, action) =>{
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled, (state, action) =>{
            console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(getCartItems.rejected, (state, action) =>{
            state.isLoading = false;
        })

    }

} )
export default cartSlice.reducer
export const {clearCart, removeItem, increase, decrease,calculateTotal} = cartSlice.actions
// console.log(cartSlice)