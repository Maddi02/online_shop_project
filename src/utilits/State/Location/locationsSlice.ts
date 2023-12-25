import {createSlice} from "@reduxjs/toolkit";
interface LocationsState{
    country: string
}

const initialState: LocationsState = {
    country : ""
}

const locationSlice = createSlice({
    name : "Location",
    initialState,
    reducers: {
        change: (state, action) => {
            state.country = action.payload;
        }
    }
})

export default locationSlice.reducer;

