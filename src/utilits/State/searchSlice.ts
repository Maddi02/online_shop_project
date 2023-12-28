// features/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

export interface SearchState {
    searchTerm: string;
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: ' ',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
