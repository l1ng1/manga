import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// let URL_API ='https://api.remanga.org/api';


export const fetchPopularMangaList = createAsyncThunk('manga/fetchManga', async () => {
    const post_data = {
        // 'url': `https://api.remanga.org/api/titles/`
        'url': `https://api.remanga.org/api/titles/`
        
    }
    const response = await fetch('https://lapse.site/t_api/manga.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post_data),
    });
    const data = await response.json();
    console.log(data)
    return data;
});

export const searchManga = createAsyncThunk('manga/searchManga', async (text) => {
    const post_data = {
        'url': "https://api.remanga.org/api/search/?query=" + text + "&count=10"
    }
    // console.log('startSearch');
    const response = await fetch('https://lapse.site/t_api/manga.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'bearer '
        },
        body: JSON.stringify(post_data),
    });
    const data = await response.json();
    console.log(data);
    return data;
});

const mangaSlice = createSlice({
    name: 'manga',
    initialState: { 
        popularManga: [],
        searchResults: [],
        currentToms: [],
        currentChapters: [],
    },
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPopularMangaList.fulfilled, (state, action) => {
            if (action.payload) {
                // console.log(JSON.parse(action.payload));
                state.popularManga = action.payload.external_data
            } else {
                console.log('Error');
            }
        });
    
        builder.addCase(searchManga.fulfilled, (state, action) => {
            if (action.payload) {
                console.log('searchMangaрмтбитб');
                console.log(action.payload.external_data.content);
                state.searchResults = action.payload.external_data.content;
                // console.log(state.searchResults);
            } else {
                console.log('Error');
            }
        });
    }
    
});

export const { clearSearchResults } = mangaSlice.actions;
export default mangaSlice.reducer;
