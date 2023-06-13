import { createSlice } from "@reduxjs/toolkit";
const initialState={
   totalQty: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.totalQty += action.payload;
        },
        removeFromCart: (state, action) => {
            // state.totalQty = -1
        }
    }
})
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;