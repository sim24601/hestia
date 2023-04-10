import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import PolarArea from "../Charts/PolarArea";
import BarChart from "../Charts/Barchart";

export default function DashboardRisk() {
    const datadb = store.getState().commune.properties;

    const labelsRisk = ["submersion", "debordement", "argile"];

    const dataRisk = {
        labels: labelsRisk,
        datasets: [
          {
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            borderColor: "grey",
            borderWidth:0,
            data: [Math.floor(datadb.submersion*10000)/100, Math.floor(datadb.debordement*10000)/100, Math.floor(datadb.argile*100/3)],
          },
        ],
      };

    const optionsRisk = {
      plugins: {
        title: {
          display: true,
          text: "niveau de risque en %",
        },
        legend: {
            display: true,
            position: 'bottom',
        }
      }
    };

    const styleChart = {
        margin: '0',
        padding: '0',
        position: 'absolute',
        right:'1vw',
        bottom:'1vw',
        height: '10vw',
        width:'25vw'};

    return (
        <div>
            <ul>
            <p>Part incendiée depuis 2014 : {datadb.incendies}</p>
            <p>taux d'ensoleillement : {Math.floor(datadb.ensoleillement*100)/100} %</p>
            <p style={styleChart}><BarChart donnee={dataRisk} largeur={45} hauteur={25} options={optionsRisk}/></p>
            </ul>
        </div>
    );
}