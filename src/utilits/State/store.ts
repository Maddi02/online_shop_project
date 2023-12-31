import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './locationsSlice';
import authReducer from './authSlice.ts';
import subcategoriesReducer from './subCategorieSlice.ts';
import categoriesReducer from './categorieSlice.ts';
import articelsReducer from './productSlice.ts';
import searchReducer from "./searchSlice.ts";
import selectedCategoriesReducer from "./selectedCategoriesSlice.ts"
import selectedSubCategoriesReducer from "./selectedSubcategoriesSlice.ts"
import cardReducer from "./cardSlice.ts"
import orderReducer from "./orderSlice.ts"
import reviewReducer from "./reviewSlice.ts"
import commentReducer from "./commentSlice.ts"

export const store = configureStore({
    reducer: {
        location: locationReducer,
        auth: authReducer,
        subcategories: subcategoriesReducer,
        categories: categoriesReducer,
        article: articelsReducer,
        search: searchReducer,
        selectedCategories: selectedCategoriesReducer,
        selectedSubcategories:selectedSubCategoriesReducer,
        card: cardReducer,
        order: orderReducer,
        review: reviewReducer,
        commend: commentReducer

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
