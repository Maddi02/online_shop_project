// selectedSubcategoriesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

const initialState: string[] = [];

const selectedSubcategoriesSlice = createSlice({
  name: 'selectedSubcategories',
  initialState,
  reducers: {
    toggleSubcategory: (state, action) => {
      const subcategoryId = action.payload;
      if (state.includes(subcategoryId)) {
        return state.filter((id) => id !== subcategoryId);
      } else {
        return [...state, subcategoryId];
      }
    },
  },
});

export const { toggleSubcategory } = selectedSubcategoriesSlice.actions;
export default selectedSubcategoriesSlice.reducer;
export const selectSelectedSubcategories = (state: RootState): string[] => {
  return state.selectedSubcategories;
};