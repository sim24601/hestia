import { configureStore } from "@reduxjs/toolkit";
import Map from "./stores/Map";
import Commune from "./stores/Commune";
import Charts from "./stores/Charts";

export default configureStore({
  reducer: {
    map: Map,
    commune: Commune,
    charts: Charts,
  },
});
