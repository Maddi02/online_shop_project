import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";

// Define a TypeScript type for Article based on your Mongoose schema
export interface Article {
    _id: string;
    name: string;
    price: number;
    categoryId: string;
    href: string;
    quantity: number;
    rating: number;
    shortdescription: string;
    description: string;
    // Add subcategoryId if needed
}

interface ArticlesState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ArticlesState = {
    articles: [],
    status: 'idle',
    error: null
};

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async () => {
        const response = await axiosInstance.get('/shop/articles');
        return response.data;
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        // Add any reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add fetched articles to the state
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default articlesSlice.reducer;

