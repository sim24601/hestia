import React from "react";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import PolarArea from "../Charts/PolarArea";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import store from "../../store";
import "../../styles/Home.css";

export default function DetailClimat() {
    const datadb = store.getState().commune.properties;

    const labelsTemperature = ["min", "mediane", "max"];

    const dataTemperature = {
        labels: labelsTemperature,
        datasets: [
          {
            label: "Temperatures",
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            borderColor: "grey",
            borderWidth:0,
            data: [datadb.temperature_min, datadb.temperature_mediane, datadb.temperature_max],
          },
        ],
      };

    const optionsTemperature = {
      plugins: {
        title: {
          display: true,
          text: "Temperatures depuis 2014",
        },
        legend: {
            display: true,
            position: 'bottom',
        }
      }
    };

    const labelsMeteo = ["tempêtes", "vents violents", "pluie forte"];

    const dataMeteo = {
      labels: labelsMeteo,
      datasets: [
        {
          label: "",
          backgroundColor: ["#00cdb1","#ffa641","#ff4848", "#a0d8e7", "#ffc638"],
          borderColor: "#ffc638",
          border:0,
          borderRadius : 4,
          data: [datadb.tempetes, datadb.vents_violents, datadb.pluie_forte],
        },
      ],
    };
    const optionsMeteo = {
      plugins: {
          title: {
            display: true,
            text: "Nombres d'évènements depuis 2014'",
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
              
              <BarChart donnee={dataMeteo} largeur={30} hauteur={35} options={optionsMeteo}/>
              <BarChart donnee={dataTemperature} largeur={30} hauteur={35} options={optionsTemperature}/>
            </ul>
          </div>
        </div>
    );
}