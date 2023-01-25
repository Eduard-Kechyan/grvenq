import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './errorSlice';

export default configureStore({
    reducer: {
        error: errorReducer
    },
});