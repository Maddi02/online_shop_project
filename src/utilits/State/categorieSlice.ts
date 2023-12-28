import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Assuming Subcategory is a type imported from subCategorieSlice.ts
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
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null
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
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
