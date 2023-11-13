import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPopularMangaList = createAsyncThunk('dog/fetchDog', async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data;
});

const counterSlice = createSlice({
    name: 'popular',
    initialState: { 
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDog.fulfilled, (state, action) => {
            if (action.payload) {
                state.image = action.payload.message;
                // console.log(action.payload);
                console.log(state.image);
            } else {
                console.log('Error')
            }
        })
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

// похожие
// {self.api}/api/titles/{title}/similar/

// поиск search_title
// {self.api}/api/search/?query={title}&count={count}