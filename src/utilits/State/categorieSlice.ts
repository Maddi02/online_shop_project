import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";

// Adjusted Category interface
export interface Category {
    _id: string;  // Using _id as it seems to be the identifier used in your data
    name: string;
    subcategoryIds: string[];  // Array of subcategory IDs
    // ... other category properties like __v if needed
}

// Define the state type for categories
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
                // Assuming the payload is an array of Category objects
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
