import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import { CategoryScale, Chart } from "chart.js";
import BarChart from "../Charts/Barchart";

export default function DashboardPopulation() {
    const datadb = store.getState().commune.properties;

    const labelsAge = ["0-14", "15-29", "30-44", "45-59", "60-74", "75-89", "90+"];

    const dataAge = {
      labels: labelsAge,
      datasets: [
        {
          label: "Population par âge",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.pop_14, datadb.pop_29, datadb.pop_44, datadb.pop_59, datadb.pop_74, datadb.pop_89, datadb.pop_100],
        },
      ],
    };

    return (
        <div>
          <ul>
            <p>population : {datadb.population}</p>
            <p>revenu median : {datadb.revenu_median}</p>
            <BarChart donnee={dataAge} largeur={100} hauteur={150} />
          </ul>
        </div>
    );
}