import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";

export interface Category {
    _id: string;
    name: string;
    subcategoryIds: string[];
}

export interface CategoriesState {
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axiosInstance.get<Category[]>('shop/categories/');
        return response.data;
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
