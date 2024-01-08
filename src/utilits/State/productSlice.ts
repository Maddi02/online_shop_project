import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";
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
    subcategoryId: string
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
        console.log(response)
        return response.data;
    }
);

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add fetched articles to the state
                state.articles = action.payload;
                console.log(state.articles)
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                 state.error = action.error.message ?? null;
            });
    }
});

export default articlesSlice.reducer;

