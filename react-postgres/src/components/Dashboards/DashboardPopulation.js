import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import BarChart from "../Charts/Barchart";

export default function DashboardPopulation() {
    const datadb = store.getState().commune.properties;

    const labelsAge = ["0-14", "15-29", "30-44", "45-59", "60-74", "75-89", "90+"];

    const dataAge = {
      labels: labelsAge,
      datasets: [
        { label: "nombre de résidents",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.pop_14, datadb.pop_29, datadb.pop_44, datadb.pop_59, datadb.pop_74, datadb.pop_89, datadb.pop_100],
        },
      ],
    };
    const optionsAge = {
      plugins: {
        title: {
          display: true,
          text: "Age des résidents",
        },
          legend: {
              display: false,
          }
      }
    };

    const styleChart = {
      margin: '-5',
      padding: '-3',
      position: 'absolute',
      left:'0.7vw',
      bottom:'3.5vw',
      height: '10vw',
      width:'25vw'};

    return (
        <div>
          <ul>
            <p>population : {datadb.population}</p>
            <p>revenu median : {datadb.revenu_median}</p>
            <p style={styleChart}><BarChart donnee={dataAge} largeur={36} hauteur={21} options={optionsAge}/></p>
          </ul>
        </div>
    );
}