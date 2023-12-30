import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";
import {RootState} from "./store.ts";

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
    loading: boolean,
    error: string | null,
    status: string,
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
    status: 'idle',
};

export const createOrder = createAsyncThunk(
    'cart/createOrder',
    async (userId: string, {getState}) => {
        const state = getState() as RootState;
        const cartItems = state.card.items;

        const order = {
            orderNr: Math.floor(Math.random() * 1000000),
            articles: cartItems.map((item: CartItem) => ({
                articleId: item._id,
                quantity: item.quantity,
                price: item.price
            })),
            userId: userId,
            orderDate: new Date().toISOString()
        };

            const response = await axiosInstance.post('/shop/order/', order, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(response.data)
            return response.data;
    }
);


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
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearCart: (state) => {
        state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
                state.status = 'failed';
            });
    },
});

export const {addToCart, updateQuantity, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;