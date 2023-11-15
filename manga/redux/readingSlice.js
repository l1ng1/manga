import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//для поиска
// "https://api.remanga.org/api/search?query=наруто&count=10"
// для поиска томов
// https://api.remanga.org/api/titles/chapters/?branch_id= + manga.id
// для поиска глав
// https://api.remanga.org/api/titles/chapters/ + tom.id + /

export const getTomes = createAsyncThunk('read/getTomes', async (mangaID) => {
    const post_data = {
        'url': "https://api.remanga.org/api/titles/chapters/?branch_id=" + mangaID
    }
    // console.log('startgetTomes');
    const response = await fetch('https://lapse.site/t_api/manga.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'bearer '
        },
        body: JSON.stringify(post_data),
    });
    const data = await response.json();
    return data;
});

export const getChapters = createAsyncThunk('read/getChapters', async (tomID) => {
    const post_data = {
        'url': "https://api.remanga.org/api/titles/chapters/" + tomID + "/"
    }
    // console.log('startgetChapters');
    const response = await fetch('https://lapse.site/t_api/manga.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'bearer '
        },
        body: JSON.stringify(post_data),
    });
    const data = await response.json();
    return data;
});

const readingSlice = createSlice({
    name: 'read',
    initialState: { 
        currentToms: [],
        currentChapters: [],
    },
    reducers: {
        clearCurrentToms: (state) => {
            state.currentToms = [];
        },
        clearCurrentChapters: (state) => {
            state.currentChapters = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTomes.fulfilled, (state, action) => {
            if (action.payload) {
                console.log('getTomes');
                state.currentToms = action.payload.external_data.content;
            } else {
                console.log('Error');
            }
        });
    
        builder.addCase(getChapters.fulfilled, (state, action) => {
            if (action.payload) {
                console.log('getChapters');
                state.currentChapters = action.payload.external_data.content;
            } else {
                console.log('Error');
            }
        });
    }
});

export const { clearCurrentToms, clearCurrentChapters } = readingSlice.actions;
export default readingSlice.reducer;
