import React from "react";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import store from "../../store";
import "../../styles/Home.css";

export default function DetailPopulation() {
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
    const optionsAge = {
      interaction: {
        // Overrides the global setting
        mode: 'index'
      },
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
          }
      }
    };

    const labelsAncien = ["0-2 ans", "2-4 ans", "4-9 ans", "10+ ans"];
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

    const labelsFamille = ["celibataire","couple","famille","monoparentale"]
    const dataFamille = {
      labels: labelsFamille,
      datasets: [
        {
          label: "Situation Familiale",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848"],
          data: [datadb.nb_menage_seul, datadb.nb_men_ssenf, datadb.nb_men_enf, datadb.nb_men_mono],
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
              <p>situation familale par ménage :</p>
              <PieChart donnee={dataFamille} largeur={40} hauteur={40} />
              <p>population par âges :</p>
              <BarChart donnee={dataAge} largeur={30} hauteur={35} options={{optionsAge}}/>
              <p>population par anciennete :</p>
              <PieChart donnee={dataAncien} largeur={40} hauteur={40} />
            </ul>
          </div>
        </div>
    );
}