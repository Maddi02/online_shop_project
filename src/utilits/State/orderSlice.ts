import {Article, fetchArticles} from "./productSlice.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.ts";

export interface Order {
    _id: string;
    articles: [Article];
    orderDate: string;
    orderNumber: number;
    user_id: string
}

interface OrderState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    articles: [],
    status: 'idle',
    error: null
};

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await axiosInstance.get('/shop/orders/');
        console.log(response)
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
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload;
                console.log(state.articles)
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });

    }
});

export default orderSlice.reducer;