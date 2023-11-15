import { configureStore } from "@reduxjs/toolkit";
import mangaSlice from './mangaSlice';
import readingSlice from "./readingSlice";

const store = configureStore({
    reducer: {
        manga: mangaSlice,
        read: readingSlice,
    }
});

export default store;