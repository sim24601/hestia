import React from "react";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import PolarArea from "../Charts/PolarArea";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import store from "../../store";
import "../../styles/Home.css";

export default function DetailImmobilier() {
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

    const optionsType = {
      plugins: {
        title: {
          display: true,
          text: "Carte des risques",
        },
        legend: {
            display: true,
            position: 'bottom',
        }
      }
    };

    const labelsEvent = ["Tempetes", "Vents Violents", "Pluie forte"];

    const dataEvent = {
      labels: labelsEvent,
      datasets: [
        {
          label: "Evenements climatiques depuis 2014",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.tempetes, datadb.vents_violents, datadb.pluie_forte],
        },
      ],
    };
    const optionsEvent = {
      plugins: {
          title: {
            display: true,
            text: "Nombre d'évènements climatiques depuis 2014",
          },
          legend: {
              display: true,
              position: 'bottom',
          }
      }
    }

    return (
        <div className="territoire-container">
          <div id="detail-container" className="container" 
          style={{
            visibility: "visible",
            opacity: "1",
          }}>
          <Link to="/territoire">
            <CloseIcon className="icon-close" fontSize="large"/>
          </Link>
            <ul style={{
            display: "inline",
          }}>
              <PolarArea donnee={dataRisk} largeur={250} hauteur={250} options={optionsType}/>
              <BarChart donnee={dataEvent} largeur={30} hauteur={35} options={optionsEvent}/>
            </ul>
          </div>
        </div>
    );
}