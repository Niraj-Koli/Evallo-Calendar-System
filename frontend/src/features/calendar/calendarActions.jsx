import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NODE_SERVER_URL;

export const createEvent = createAsyncThunk(
    "calendar/createEvent",
    async (event) => {
        const res = await axios.post(`${API_URL}/events`, event);

        return res.data;
    }
);
