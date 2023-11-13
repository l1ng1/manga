import { configureStore } from "@reduxjs/toolkit";
import mangaSlice from './mangaSlice';

const store = configureStore({
    reducer: {
        manga: mangaSlice
    }
});

export default store;