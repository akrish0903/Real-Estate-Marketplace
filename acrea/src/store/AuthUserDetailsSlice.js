import { createSlice } from "@reduxjs/toolkit";

var initialAuthState = {
    usrEmail: null,
    usrFullName: null,
    usrMobileNumber: null,
    usrType: null,
    usrRefreshToken: null,
    usrAccessToken: null,
    usrProfileUrl: null,
    userBio: null,
}

var AuthUserDetailsSlice = createSlice({
    name: "AuthUserDetailsSlice",
    initialState: initialAuthState,
    reducers: {
        setUsrEmail: (state, action) => {
            state.usrEmail = action.payload;
        },
        setUsrFullName: (state, action) => {
            state.usrFullName = action.payload;
        },
        setUsrMobileNumber: (state, action) => {
            state.usrMobileNumber = action.payload;
        },
        setUsrType: (state, action) => {
            state.usrType = action.payload;
        },
        setUsrProfileUrl: (state, action) => {
            state.usrProfileUrl = action.payload;
        },
        setUserBio: (state, action) => {
            state.userBio = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.usrRefreshToken = action.payload;
        },
        setAccessToken: (state, action) => {
            state.usrAccessToken = action.payload;
        },
    }
})

export const AuthUserDetailsSliceAction = AuthUserDetailsSlice.actions;
export default AuthUserDetailsSlice;