import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'app',
    initialState: {
        posts: null,
        cartDetail:null,
        nowPlaying:null,
        nowPlayingStatus:false
    },
    reducers: {
        savePosts: (state, action) => {
            state.posts = action.payload
        },
        saveCartDetail: (state, action) => {
            state.cartDetail = action.payload
        },
        saveNowPlaying: (state, action) => {
            state.nowPlaying = action.payload
        },
        saveNowPlayingStatus: (state, action) => {
            state.nowPlayingStatus = action.payload
        },
    }
})

export const { savePosts,saveCartDetail,saveNowPlaying,saveNowPlayingStatus } = userSlice.actions

export default userSlice.reducer





