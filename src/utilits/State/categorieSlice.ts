import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { Subcategory } from "./subCategorieSlice.ts";
import axiosInstance from "../../api/axios.ts";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axiosInstance.get('shop/categories/');
        return response.data;
    }
);

// Define the state type
interface CategoriesState {
    categories: Subcategory[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    name: string
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null,
    name: ''
};

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
                state.categories = action.payload; // Ensure this matches the type of data returned by the API
                console.log(action.payload)
                state.name = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
