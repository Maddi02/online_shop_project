import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './locationsSlice'; // If this is a TypeScript file
import authReducer from './authSlice.ts';
import subcategoriesReducer from './subCategorieSlice.ts';
import categoriesReducer from './categorieSlice.ts';

export const store = configureStore({
    reducer: {
        location: locationReducer,
        auth: authReducer,
        subcategories: subcategoriesReducer,
        categories: categoriesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
