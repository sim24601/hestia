import { createSlice } from "@reduxjs/toolkit";

const { api_url, config } = require("../settings");
const configColors = config.colors;
const configColorsBackgroundColor = configColors.backgroundColor;
const configColorsBorderColor = configColors.borderColor;

export const charts = createSlice({
    name: "charts",
    initialState: {
        Population: {
            charts: {
                population: {
                    typeChart: "bar",
                    titleChart: "Population",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "20",
                    widthChart: "17",
                    labelsChart: ["Female", "Male"],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/population/",
                            urlParams: "",
                            backgroundColor: configColorsBackgroundColor[3],
                            borderColor: configColorsBorderColor[3],
                            borderWidth: 1,
                        },
                    ],
                },
                population_age: {
                    typeChart: "bar",
                    titleChart: "Population by age",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "20",
                    widthChart: "24",
                    labelsChart: [
                        "0-14",
                        "15-29",
                        "30-44",
                        "45-59",
                        "60-75",
                        ">75",
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/population/distribution/",
                            urlParams: "?by=age",
                            backgroundColor: configColorsBackgroundColor[1],
                            borderColor: configColorsBorderColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
                population_age_sex: {
                    typeChart: "bar",
                    titleChart: "Population by age and sex",
                    titleDisplay: "true",
                    legendDisplay: "true",
                    maintainAspectRatio: true,
                    heightChart: "23",
                    widthChart: "35",
                    labelsChart: [
                        "0-14",
                        "15-29",
                        "30-44",
                        "45-59",
                        "60-75",
                        ">75",
                    ],
                    datasets: [
                        // Female
                        {
                            label: "Female",
                            data: [],
                            url: api_url + "insee/population/distribution/",
                            urlParams: "?by=sex",
                            backgroundColor: configColorsBackgroundColor[0],
                            borderColor: configColorsBorderColor[0],
                            borderWidth: 1,
                        },
                        // Male
                        {
                            label: "Male",
                            data: [],
                            url: api_url + "insee/population/distribution/",
                            urlParams: "?by=sex",
                            backgroundColor: configColorsBackgroundColor[1],
                            borderColor: configColorsBorderColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
            },
        },
        Housing: {
            charts: {
                type: {
                    typeChart: "bar",
                    titleChart: "Type",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "22",
                    widthChart: "16",
                    labelsChart: [
                        "Total",
                        "Appartment",
                        "House",
                        "Main",
                        "Second",
                        "Unoccupied",
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/logement/",
                            urlParams: "",
                            backgroundColor: [
                                configColorsBackgroundColor[0],
                                configColorsBackgroundColor[1],
                                configColorsBackgroundColor[1],
                                configColorsBackgroundColor[3],
                                configColorsBackgroundColor[3],
                                configColorsBackgroundColor[3],
                            ],
                            borderColor: [
                                configColorsBorderColor[0],
                                configColorsBorderColor[1],
                                configColorsBorderColor[1],
                                configColorsBorderColor[3],
                                configColorsBorderColor[3],
                                configColorsBorderColor[3],
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                year: {
                    typeChart: "bar",
                    titleChart: "Year",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "22",
                    widthChart: "17",
                    labelsChart: [
                        "< 1919",
                        "1920-1945",
                        "1946-1970",
                        "1971-1990",
                        "1991-2005",
                        "2006-2011",
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/logement/distribution/",
                            urlParams: "?by=year",
                            backgroundColor: configColorsBackgroundColor[1],
                            borderColor: configColorsBorderColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
                room: {
                    typeChart: "bar",
                    titleChart: "Room",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "22",
                    widthChart: "16",
                    labelsChart: ["1 room", "2 room", "3 room", "4 room", ">5"],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/logement/distribution/",
                            urlParams: "?by=room",
                            backgroundColor: configColorsBackgroundColor[0],
                            borderColor: configColorsBorderColor[0],
                            borderWidth: 1,
                        },
                    ],
                },
                area: {
                    typeChart: "bar",
                    titleChart: "Area",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "22",
                    widthChart: "17",
                    labelsChart: [
                        "<30m2",
                        "30-40m2",
                        "40-60m2",
                        "60-80m2",
                        "80-100m2",
                        "100-120m2",
                        ">120m2",
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/logement/distribution/",
                            urlParams: "?by=area",
                            backgroundColor: configColorsBackgroundColor[3],
                            borderColor: configColorsBorderColor[3],
                            borderWidth: 1,
                        },
                    ],
                },
            },
        },
        Employment: {
            charts: {
                employment: {
                    typeChart: "bar",
                    titleChart: "Employment",
                    titleDisplay: "true",
                    legendDisplay: "false",
                    maintainAspectRatio: true,
                    heightChart: "15",
                    widthChart: "15",
                    labelsChart: [
                        "Active",
                        "Inactive",
                        "Unemployed",
                        "Student",
                        "Retired",
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [],
                            url: api_url + "insee/activite/",
                            urlParams: "",
                            backgroundColor: configColorsBackgroundColor[0],
                            borderColor: configColorsBorderColor[0],
                            borderWidth: 1,
                        },
                    ],
                },
                employment_sex: {
                    typeChart: "bar",
                    titleChart: "Employment by sex",
                    titleDisplay: "true",
                    legendDisplay: "true",
                    maintainAspectRatio: true,
                    heightChart: "18",
                    widthChart: "15",
                    labelsChart: [
                        "Active",
                        "Inactive",
                        "Unemployed",
                        "Student",
                        "Retired",
                    ],
                    datasets: [
                        // Female
                        {
                            label: "Female",
                            data: [],
                            url: api_url + "insee/activite/distribution/",
                            urlParams: "?by=sex",
                            backgroundColor: configColorsBackgroundColor[3],
                            borderColor: configColorsBorderColor[3],
                            borderWidth: 1,
                        },
                        // Male
                        {
                            label: "Male",
                            data: [],
                            url: api_url + "insee/activite/distribution/",
                            urlParams: "?by=sex",
                            backgroundColor: configColorsBackgroundColor[1],
                            borderColor: configColorsBorderColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
                employment_age: {
                    typeChart: "bar",
                    titleChart: "Employment by age",
                    titleDisplay: "true",
                    legendDisplay: "true",
                    maintainAspectRatio: true,
                    heightChart: "17",
                    widthChart: "15",
                    labelsChart: ["15-24", "25-54", "55-64"],
                    datasets: [
                        // Active
                        {
                            label: "Active",
                            data: [],
                            url: api_url + "insee/activite/distribution/",
                            urlParams: "?by=age",
                            backgroundColor: configColorsBackgroundColor[0],
                            borderColor: configColorsBorderColor[0],
                            borderWidth: 1,
                        },
                        // Unemployed
                        {
                            label: "Unemployed",
                            data: [],
                            url: api_url + "insee/activite/distribution/",
                            urlParams: "?by=age",
                            backgroundColor: configColorsBackgroundColor[1],
                            borderColor: configColorsBorderColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
            },
        },
    },
    reducers: {
        updateChartData: (state, props) => {
            const payload = props.payload;
            state[payload.section]["charts"][payload.chart]["datasets"][
                payload.index
            ]["data"] = payload.data;
        },
    },
});

export const { updateChartData } = charts.actions;

export default charts.reducer;
