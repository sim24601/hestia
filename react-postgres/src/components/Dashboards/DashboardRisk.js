import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import PolarArea from "../Charts/PolarArea";

export default function DashboardRisk() {
    const datadb = store.getState().commune.properties;
    const labelsRisk = ["submersion", "debordement", "argile"];

    const dataRisk = {
        labels: labelsRisk,
        datasets: [
          {
            label: "Carte des risques",
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            borderColor: "grey",
            borderWidth:0,
            data: [Math.floor(datadb.submersion*10000)/100, Math.floor(datadb.debordement*10000)/100, Math.floor(datadb.argile*100/3)],
          },
        ],
      };

    return (
        <div>
            <ul>
                <PolarArea donnee={dataRisk} largeur={120} hauteur={120} />
            </ul>
        </div>
    );
}