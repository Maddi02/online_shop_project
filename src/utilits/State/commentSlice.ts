import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from "../../api/axios.ts";

export interface Comment {
    articleId: string;
    comment: string;
    date: string;
    userId: string;
}

interface CommentState {
    comments: { [key: string]: Comment };
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: {},
    loading: false,
    error: null
};

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (articleId: string, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/shop/comments/${articleId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<Comment>) {
            state.comments[action.payload.articleId] = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                const comment = action.payload;
                state.comments[comment.articleId] = comment; // or use the appropriate unique key
                state.loading = false;
                state.loading = false;
            })
            .addCase(postComment.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            }).addCase(fetchComments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchComments.fulfilled, (state, action) => {
                action.payload.forEach((comment: Comment) => {
                    state.comments[comment.articleId] = comment;
                });
                state.loading = false;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const {addComment, setError} = commentSlice.actions;

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (reviewData: Comment, {dispatch, rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/shop/comment/', reviewData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(addComment(response.data));
            return response.data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
);
export default commentSlice.reducer;