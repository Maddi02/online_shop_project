import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";

interface SelectedCategoriesState {
    selectedCategories: {
        [categoryId: string]: string[]; // Maps category IDs to an array of subcategory IDs
    };
}

const initialState: SelectedCategoriesState = {
    selectedCategories: {},
};

const selectedCategoriesSlice = createSlice({
    name: 'selectedCategories',
    initialState,
    reducers: {
        toggleCategory: (state, action: PayloadAction<{ categoryId: string, subcategoryIds: string[] }>) => {
            const { categoryId, subcategoryIds } = action.payload;
            if (state.selectedCategories[categoryId]) {
                // If the category is already selected, remove it
                delete state.selectedCategories[categoryId];
            } else {
                // If the category is not selected, add it along with its subcategory IDs
                state.selectedCategories[categoryId] = subcategoryIds;
            }
        },
    },
});

// Export the reducer as default
export default selectedCategoriesSlice.reducer;

// Export actions as named exports
export const { toggleCategory } = selectedCategoriesSlice.actions;

// Selector
export const selectSelectedCategories = (state: RootState): { [categoryId: string]: string[] } => {
    return state.selectedCategories.selectedCategories;
};
