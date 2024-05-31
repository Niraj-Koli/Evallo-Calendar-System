import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    accessToken: localStorage.getItem("access"),
    refreshToken: localStorage.getItem("refresh"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTokens(state, action) {
            const data = action.payload;

            localStorage.setItem("access", data.access_token);
            localStorage.setItem("refresh", data.refresh_token);
            state.accessToken = data.access_token;
            state.refreshToken = data.refresh_token;
            state.isAuthenticated = true;
        },
        setLogout: (state) => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setTokens, setLogout } = authSlice.actions;
export default authSlice.reducer;
