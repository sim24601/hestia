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

    const labelsEvent = ["Inondations", "Tempête", "Sécheresse", "Submersion", "Glissement de terrain"];

    const dataEvent = {
      labels: labelsEvent,
      datasets: [
        {
          label: "",
          backgroundColor: ["#00cdb1","#ffa641","#ff4848", "#a0d8e7", "#ffc638"],
          borderColor: "#ffc638",
          border:0,
          borderRadius : 4,
          data: [datadb["Inondations.et.ou.Coulées.de.Boue"], datadb["Tempête"], datadb["Sécheresse"], datadb["Chocs.Mécaniques.liés.à.l.action.des.Vagues"], datadb["Glissement.de.Terrain"]],
        },
      ],
    };
    const optionsEvent = {
      plugins: {
          title: {
            display: true,
            text: "Nombres de Catastrophes climatiques depuis 1984",
          },
          legend: {
              display: true,
              position: 'bottom',
          }
      }
    }

    return (
        <div className="territoire-container">
          <div id="Drisk-container" className="container" 
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
              <BarChart donnee={dataEvent} largeur={130} hauteur={50} options={optionsEvent}/>
            </ul>
          </div>
        </div>
    );
}