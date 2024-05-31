import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { setTokens, setUser } from "./authSlice";

const API_URL = import.meta.env.VITE_NODE_SERVER_URL;

export const getTokens = createAsyncThunk(
    "auth/getTokens",
    async (code, { dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const res = await axios.post(
                `${API_URL}/auth/googleLogin`,
                { code },
                config
            );

            const data = res.data;

            dispatch(setUser(data.userInfo));
            dispatch(setTokens(data.tokens));

            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
);
