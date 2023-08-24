import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'main',
    initialState: {
        user: {},
        chats: [],
        loading: true,
        error: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
})

export const { setUser, setChats, setError, setLoading } = userSlice.actions

export default userSlice.reducer