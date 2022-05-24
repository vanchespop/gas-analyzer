import {configureStore} from "@reduxjs/toolkit";
import measurementsSlice from "./measurements";

export const store = configureStore({
    reducer: measurementsSlice
});
