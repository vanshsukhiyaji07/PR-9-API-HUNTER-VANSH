import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postslice";
export const store = configureStore({
    reducer: {
        posts : postsReducer
    }
});