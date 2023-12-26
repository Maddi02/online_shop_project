import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './locationsSlice'; // If this is a TypeScript file
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        location: locationReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
