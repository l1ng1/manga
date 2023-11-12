import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let URL_API = 'http://localhost:3000/api';

export const fetchPopularMangaList = createAsyncThunk('manga/fetchManga', async () => {
    const response = await fetch(`${URL_API}/titles/`);
    const data = await response.json();
    return data;
});

export const searchManga = createAsyncThunk('manga/searchManga', async (text) => {
    const response = await fetch(`${URL_API}/search?query=${text}&count=10`);
    const data = await response.json();
    return data;
});

const mangaSlice = createSlice({
    name: 'manga',
    initialState: { 
        popularListOfManga: [],
        searchResults: [], 
    },
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularMangaList.fulfilled, (state, action) => {
            if (action.payload) {
                state.popularListOfManga = action.payload;
            } else {
                console.log('Error');
            }
        });

        builder.addCase(searchManga.fulfilled, (state, action) => {
            if (action.payload) {
                state.searchResults = action.payload;
            } else {
                console.log('Error');
            }
        });
    }
});

export const { clearSearchResults } = mangaSlice.actions;
export default mangaSlice.reducer;