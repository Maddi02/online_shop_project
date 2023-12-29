// selectedCategoriesSlice.js
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

interface SelectedCategoriesState {
    selectedCategories: string[]; // Array of category IDs
}

const initialState: SelectedCategoriesState = {
    selectedCategories: [],
};

export const selectedCategoriesSlice = createSlice({
    name: 'selectedCategories',
    initialState,
    reducers: {
        // ...
        toggleCategory: (state, action: PayloadAction<string>) => {
    const categoryId = action.payload;
    const index = state.selectedCategories.indexOf(categoryId);
    if (index >= 0) {
        state.selectedCategories.splice(index, 1); // Remove the category if it's already selected
    } else {
        state.selectedCategories.push(categoryId); // Add the category if it's not selected
    }
},

    },
});

export const {toggleCategory} = selectedCategoriesSlice.actions;
export default selectedCategoriesSlice.reducer;
export const selectSelectedCategories = (state: RootState) => state.selectedCategories.selectedCategories;

