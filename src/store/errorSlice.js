import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        source: '',
        message: '',
    },
    reducers: {
        setError: (state, action) => {
            state.source = action.payload.source;
            state.message = action.payload.message;
        },
    },
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer