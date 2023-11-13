// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // let URL_API = 'http://localhost:3000/api';
// let URL_API ='https://api.remanga.org/api/titles'

// export const fetchPopularMangaList = createAsyncThunk('manga/fetchManga', async () => {
//     // const response = await fetch(`${URL_API}/titles/`);
//     console.log('start');
//     const response = await fetch('https://api.remanga.org/api/titles',{
//         method: 'GET',
//         mode:'no-cors',
//         headers: {
//         'Content-Type': 'application/json',
//     },
//     });
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//     return data;
// });

// export const searchManga = createAsyncThunk('manga/searchManga', async (text) => {
//     const response = await fetch(`${URL_API}/search?query=${text}&count=10`);
//     const data = await response.json();
//     return data;
// });

// const mangaSlice = createSlice({
//     name: 'manga',
//     initialState: { 
//         popularListOfManga: [],
//         searchResults: [], 
//     },
//     reducers: {
//         clearSearchResults: (state) => {
//             state.searchResults = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchPopularMangaList.fulfilled, (state, action) => {
//             if (action.payload) {
//                 state.popularListOfManga = action.payload;
//                 console.log(action.payload);
//             } else {
//                 console.log('Error');
//             }
//         });

//         builder.addCase(searchManga.fulfilled, (state, action) => {
//             if (action.payload) {
//                 state.searchResults = action.payload;
//             } else {
//                 console.log('Error');
//             }
//         });
//     }
// });

// export const { clearSearchResults } = mangaSlice.actions;
// export default mangaSlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDog = createAsyncThunk('dog/fetchDog', async (url) => {
    const post_data = {
        'url': 'https://remanga.org/api/titles/'
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

const counterSlice = createSlice({
    name: 'dog',
    initialState: { image: '' },
    extraReducers: (builder) => {
        builder.addCase(fetchDog.fulfilled, (state, action) => {
            if (action.payload) {
                state.image = action.payload.message;
                console.log(action.payload);
                console.log(state.image);
                console.log(JSON.parse(action.payload.external_data))
            } else {
                console.log('Error')
            }
        })
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;