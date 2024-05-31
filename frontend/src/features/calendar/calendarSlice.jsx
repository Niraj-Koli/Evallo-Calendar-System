import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { setEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
