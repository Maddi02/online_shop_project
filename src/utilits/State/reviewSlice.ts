import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";

interface Review {
    rate: number;
    articleId: string;
    userId: string;
}

interface Comment {
    content: string;
    articleId: string;
    userId: string;
}

interface ReviewState {
    reviews: { [key: string]: Review };
    comments: { [key: string]: Comment[] };
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: {},
    comments: {},
    loading: false,
    error: null
};

export const fetchRates = createAsyncThunk(
    'reviews/fetchRates',   async (articleId: string) => {
        const response = await axiosInstance.get(`/shop/rates/${articleId}`);
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview(state, action: PayloadAction<Review>) {
            const review = action.payload;
            state.reviews[review.articleId] = review;
        },
        addComment(state, action: PayloadAction<Comment>) {
            const comment = action.payload;
            if (!state.comments[comment.articleId]) {
                state.comments[comment.articleId] = [];
            }
            state.comments[comment.articleId].push(comment);
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRates.fulfilled, (state, action) => {
                state.reviews =  action.payload
                state.loading = false;
            })
            .addCase(fetchRates.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(postReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(postReview.fulfilled, (state, action) => {
                state.reviews[action.payload.articleId] = action.payload;
                state.loading = false;
            })
            .addCase(postReview.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    }
});

export const { addReview, addComment, setError } = reviewSlice.actions;

export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (reviewData: Review, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/shop/rate/', reviewData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(addReview(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default reviewSlice.reducer;
