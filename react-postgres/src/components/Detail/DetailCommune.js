import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import CloseIcon from '@mui/icons-material/Close';
import store from "../../store";
import "../../styles/Home.css";

export default function DetailCommune() {
    const datadb = store.getState().commune.properties;
    const labelsSecurite= ["Vols", "Violences", "Cambriolages"];
    const dataSecurite = {
        labels: labelsSecurite,
        datasets: [
          { label: "nombre par habitant",
            backgroundColor: ["#ffa641", "#ff4848", "#ffc638"],
            borderRadius : 4,
            maxBarThickness : 30,
            data: [datadb.vols/7, datadb.violences/7, datadb.cambriolages/7],
          },
        ],
    };

        const optionsSecurite = {
            plugins: {
              title: {
                display: true,
                text: "Nombre de faits par an",
              },
                legend: {
                    display: false,
                    position: "bottom",
                }
            }
          };
        
          const labelsActivite= ["Services", "Commerces", "Enseignement", "Sante", "Transports"];

    const dataActivite = {
      labels: labelsActivite,
      datasets: [
        { label: "nombre",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848", "#ffc638"],
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.services, datadb.commerces, datadb.enseignement, datadb.sante, datadb.transports],
        },
      ],
    };
    const optionsActivite = {
      plugins: {
        title: {
          display: true,
          text: "Nombre d'equipements",
        },
          legend: {
              display: false,
              position: "bottom",
          }
      }
    };

    const labelsDistance = ["Bordeaux", "Lille", "Lyon", "Paris", "Marseille", "Toulouse"];

    const dataDistance = {
      labels: labelsDistance,
      datasets: [
        { label: "Durée de trajet en minutes",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.bordeaux, datadb.lille, datadb.lyon, datadb.paris, datadb.marseille, datadb.toulouse],
        },
      ],
    };
    const optionsDistance = {
      plugins: {
        title: {
          display: true,
          text: "Durée en minutes",
        },
          legend: {
              display: false,
          }
      }
    };

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
            <BarChart donnee={dataActivite} largeur={30} hauteur={35} options={optionsActivite}/>
            <BarChart donnee={dataSecurite} largeur={30} hauteur={35} options={optionsSecurite}/>
            <BarChart donnee={dataDistance} largeur={30} hauteur={35} options={optionsDistance}/>
            </ul>
          </div>
        </div>
    );
}