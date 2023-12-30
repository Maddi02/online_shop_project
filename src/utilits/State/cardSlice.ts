import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem {
    _id: string;
    name: string;
    price: number;
    categoryId: string;
    href: string;
    description: string;
    quantity: number;
    rating: number;
    shortdescription: string;
    subcategoryId: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
            const item = state.items.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;