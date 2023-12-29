import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { AxiosError } from 'axios';

export interface Subcategory {
    _id: string | undefined;
    id: string;
    name: string;
}


interface SubcategoriesState {
    subcategories: Subcategory[];
    loading: boolean;
    error: string | null | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SubcategoriesState = {
    subcategories: [],
    loading: false,
    error: null,
    status: 'idle',
};

export const fetchSubcategories = createAsyncThunk<Subcategory[], void, { rejectValue: string }>(
    'subcategories/fetchSubcategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/shop/subcategories/');
            console.log(response)
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);


const subcategoriesSlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubcategories.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(fetchSubcategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchSubcategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export default subcategoriesSlice.reducer;
