import { createSlice } from "@reduxjs/toolkit";

const { config } = require("../settings");

export const map = createSlice({
    name: "map",
    initialState: {
        load: false,
        display: true,
        zoom: config.map.zoom,
        center: config.map.center,
        recenter: true,
    },
    reducers: {
        updateMapLoad: (state, props) => {
            const mapLoad = props.payload;
            state.load = mapLoad;
        },
        reverseMapLoad: (state) => {
            state.load = !state.load;
        },
        updateMapCenter: (state, props) => {
            const mapCenter = props.payload;
            state.center = mapCenter;
        },
        updateMapZoom: (state, props) => {
            const mapZoom = props.payload;
            state.center = mapZoom;
        },
    },
});

export const {
    updateMapLoad,
    reverseMapLoad,
    updateMapCenter,
    updateMapZoom,
} = map.actions;

export default map.reducer;