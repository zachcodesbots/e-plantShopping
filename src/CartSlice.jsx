import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload
        const existingItem = state.items.find(item => item.name === name)
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({name, image, cost, quantity: 1})
        }
        state.totalItems += 1
    },
    removeItem: (state, action) => {
        state.totalItems -= state.items.find(item => item.name === action.payload).quantity;
        state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const cartItem = state.items.find(item => item.name === name)
        if (cartItem) {
            state.totalItems += (quantity - cartItem.quantity)
            cartItem.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
