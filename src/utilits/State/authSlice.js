const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const axios = require('axios');
const axiosInstance = require('../../api/axios');

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/signup', credentials);
      return response.data;
    } catch (error) {
      if (error.response && typeof error.response.data === 'string') {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response && typeof error.response.data === 'string') {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  status: 'idle',
};

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
        state.error = action.payload;
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
        state.error = action.payload;
         state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
