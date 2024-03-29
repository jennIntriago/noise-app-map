import { createSlice } from "@reduxjs/toolkit";

export const metricSlice = createSlice({
  name: "metric",
  initialState: {
    isLoading: true,
    metrics: [],
    metricSeleted: null,
    sensorSelected: null,
  },
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
    },

    setMetric: (state, action) => {
      state.metricSeleted = action.payload;
    },

    setSensor: (state, action) => {
      state.sensorSelected = action.payload;
    },
    cleanMetric: (state, action) => {
      state.metricSeleted = null;
      state.sensorSelected = null;
    },

    changeLoading: (state, action) => {
      state.isLoading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics, setMetric, setSensor, cleanMetric, changeLoading } =
  metricSlice.actions;
