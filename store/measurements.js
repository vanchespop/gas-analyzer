import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {valueLimits} from "../utils/value-limits";

export const getMeasurements = createAsyncThunk(
    'measurements/getMeasurements',
    async () => {
        return fetch('http://localhost:3000/api/measurements')
            .then(result => result.json());
    }
)

const measurementsSlice = createSlice({
    name: "measurements",
    initialState: {
        measurements: [],
        lastMeasurement: {},
        limits: valueLimits
    },
    reducers: {
        setLimit(state, {payload: {title, newLimitValue}}) {
            const parameterLimit = state.limits.find(limit => limit.title === title);
            typeof window !== 'undefined' && localStorage.setItem(title, newLimitValue);
            parameterLimit.value = newLimitValue;
        },
    },
    extraReducers: {
        [getMeasurements.fulfilled]: (state, {payload}) => {
            state.measurements = payload;
            [state.lastMeasurement] = payload.slice(-1);
        }
    }
});

export default measurementsSlice.reducer;
export const {setLimit} = measurementsSlice.actions;
