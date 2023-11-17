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

export const getElseTomes = createAsyncThunk('read/getElseTomes', async ({ mangaID, pageNumber }) => {
    const post_data = {
        'url': "https://api.remanga.org/api/titles/chapters/?branch_id=" + mangaID + '&page=' + pageNumber
    };

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


export const getImg = createAsyncThunk('read/getImg', async (tom) => {
    try {
      const e = tom.pages[0][0].link;
      let url2 = e.startsWith("https://img5.reimg.org") ? e.replace("https://img5.reimg.org", "https://reimg2.org") : e.replace("reimg.org", "reimg2.org");
      console.log(url2);
  
      const post_data = {
        'url': url2
      }
  
      console.log('SUCSEC')
  
      const response = await fetch('https://lapse.site/t_api/manga.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post_data),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
});
  

const readingSlice = createSlice({
    name: 'read',
    initialState: { 
        currentToms: [],
        currentChapters: [],
        currentImg:[],
        pageNumber: 2,
    },
    reducers: {
        clearCurrentToms: (state) => {
            state.currentToms = [];
        },
        clearCurrentChapters: (state) => {
            state.currentChapters = [];
        },
        clearPageNumber: (state) => {
            state.currentChapters = [];
        },
        increasePageNumber: (state) => {
            state.pageNumber += 1;
        }
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

        builder.addCase(getElseTomes.fulfilled, (state, action) => {
            if (action.payload) {
                console.log('getElseTomes');
                console.log(action.payload.external_data.content);
                let contentArray = action.payload.external_data.content;
                for(let manga of contentArray) state.currentToms.push(manga);
                console.log(state.currentToms)
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

        builder.addCase(getImg.fulfilled, (state, action) => {
            if (action.payload) {
                console.log('getImg');
                console.log(action.payload);
                state.currentImg = 'lol';
            } else {
                console.log('Error');
            }
        });

    }
});

export const { clearCurrentToms, clearCurrentChapters, increasePageNumber } = readingSlice.actions;
export default readingSlice.reducer;
