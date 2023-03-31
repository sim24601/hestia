import React from "react";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import store from "../../store";
import "../../styles/Home.css";

export default function KeyFigurePopulation() {
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

    const labelsAncien = ["0-2", "2-4", "4-9", "10+"];
    const dataAncien = {
      labels: labelsAncien,
      datasets: [
        {
          label: "Anciennete dans la commune",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848"],
          data: [datadb.pop_log_2a, datadb.pop_log_4a, datadb.pop_log_9a, datadb.pop_log_10plus],
        },
      ],
    };

    return (
        <div className="territoire-container">
          <div id="detail-container" className="container" 
          style={{
            visibility: "visible",
            opacity: "1",
          }}>
            <ul style={{
            display: "inline",
          }}>
              <p>population par âges :</p>
              <BarChart donnee={dataAge} largeur={70} hauteur={120} />
              <p>population par anciennete :</p>
              <PieChart donnee={dataAncien} largeur={60} hauteur={60} />
            </ul>
          </div>
        </div>
    );
}