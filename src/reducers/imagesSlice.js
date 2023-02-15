import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ACCESS_KEY = 'NZWBAncXxblNMsMzYS7UAnr0ei0UBvIVaZF6JOYmFwM';

export const fetchImages = createAsyncThunk('images/fetchImages', async (searchTerm) => {
    let response;
    if (searchTerm) {
        response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${searchTerm}`);
    } else {
        response = await axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`);
    }
    return response.data;
});

export const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        images: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllImages = state => state.images.images;
export const selectImageStatus = state => state.images.status;

export default imagesSlice.reducer;
