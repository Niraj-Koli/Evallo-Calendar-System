import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "@/features/auth/authSlice";
import calendarSlice from "@/features/calendar/calendarSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    calendar: calendarSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
