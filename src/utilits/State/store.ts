import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './locationsSlice'; // If this is a TypeScript file
import authReducer from './authSlice.ts';
import subcategoriesReducer from './subCategorieSlice.ts';
import categoriesReducer from './categorieSlice.ts';
import articelsReducer from './productSlice.ts';
import searchReducer from "./searchSlice.ts";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        auth: authReducer,
        subcategories: subcategoriesReducer,
        categories: categoriesReducer,
        article: articelsReducer,
        search: searchReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
