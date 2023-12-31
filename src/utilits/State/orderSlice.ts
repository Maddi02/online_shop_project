import {Article} from "./productSlice.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.ts";

export interface Order {
    _id: string;
    articles: [Article];
    orderDate: string;
    orderNr: number;
    userId: string
}

interface OrderState {
    orders: Order[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    status: 'idle',
    error: null
};


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await axiosInstance.get('/shop/orders/', {
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
        return response.data;
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchOrders.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload; // Here we are updating orders, not articles
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        });
}
});

export default orderSlice.reducer;