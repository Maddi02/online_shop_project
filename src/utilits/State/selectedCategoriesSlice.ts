import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";

interface SelectedCategoriesState {
    selectedCategories: {
        [categoryId: string]: string[];
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
                delete state.selectedCategories[categoryId];
            } else {
                state.selectedCategories[categoryId] = subcategoryIds;
            }
        },
    },
});

export default selectedCategoriesSlice.reducer;
export const { toggleCategory } = selectedCategoriesSlice.actions;
export const selectSelectedCategories = (state: RootState): { [categoryId: string]: string[] } => {
    return state.selectedCategories.selectedCategories;
};
