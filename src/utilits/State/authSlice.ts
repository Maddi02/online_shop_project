import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import {AxiosError} from 'axios';


export interface User {
    _id: string ,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    street: string,
    postcode: string,
    city: string,
    country: string,
    phone: string,
    role: 'USER'
}

interface CustomError {
    message: string;
}

// Initial state type
interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}


export const registerUser = createAsyncThunk<User, {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    street: string,
    postcode: string,
    city: string,
    country: string,
    phone: string,
    role: 'USER'

}, { rejectValue: CustomError }>(
    'auth/registerUser',
    async (User, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/signup', User, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            return response.data.user;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error && error.response) {
                    return rejectWithValue({message: error.response.data as string});
                } else {
                    return rejectWithValue({message: 'An unexpected error occurred'});
                }
            }
        }
    }
);

export const loginUser = createAsyncThunk<User, { email: string, password: string }, { rejectValue: CustomError }>(
    'auth/loginUser',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/login', credentials, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            return response.data.user;
        } catch (error: unknown) {
            // First, check if it's an AxiosError
            if (error instanceof AxiosError) {
                if (error.response) {
                    // Now we can safely access error.response
                    return rejectWithValue({message: error.response.data as string});
                } else {
                    return rejectWithValue({message: error.message});
                }
            } else {
                return rejectWithValue({message: 'An unexpected error occurred'});
            }
        }
    }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: CustomError }>(
    'auth/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/logout', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            return response.data.user;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    return rejectWithValue({message: error.response.data as string});
                } else {
                    return rejectWithValue({message: error.message});
                }
            } else {
                return rejectWithValue({message: 'An unexpected error occurred'});
            }
        }
    }
);


const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    status: 'idle',
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
                state.status = 'failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
                state.status = 'failed';
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null; // Reset the user to null on successful logout
                state.status = 'succeeded';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'An error occurred';
                state.status = 'failed';
            });
    },
});

export default authSlice.reducer;
