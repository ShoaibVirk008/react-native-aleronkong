import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        userToken: null
    },
    reducers: {
        saveCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        saveUserToken: (state, action) => {
            state.userToken = action.payload
        }
    }
})

export const { saveCurrentUser, saveUserToken } = userSlice.actions

export default userSlice.reducer





