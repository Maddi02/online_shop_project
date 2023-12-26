import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GeoProvider} from '../../Location/geoProvider.ts';
import { AxiosError } from 'axios';

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (_, { rejectWithValue }) => {
    try {
      const geoProvider = GeoProvider.getInstance();
        return await geoProvider.fetchIPInfo();
    } catch (error: unknown) {
       if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data);
        } else {
        // Handle the case where the error structure is not as expected
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

interface LocationsState {
  country: string;
  regionName: string;
  city: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: LocationsState = {
  country: '',
  regionName: '',
  city: '',
  status: 'idle',
  error: null,
};

const locationSlice = createSlice({
  name: 'Location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.country = action.payload.country;
        state.city = action.payload.city
        state.regionName = action.payload.regionName;
        state.status = 'succeeded';
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default locationSlice.reducer;
