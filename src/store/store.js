import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './../reducers/imagesSlice';

export default configureStore({
    reducer:{
        images:imagesReducer
    }
})