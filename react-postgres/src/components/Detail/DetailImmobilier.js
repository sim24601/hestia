import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import CloseIcon from '@mui/icons-material/Close'
import store from "../../store";
import "../../styles/Home.css";

export default function DetailImmobilier() {
    const datadb = store.getState().commune.properties;

    const labelsType = ["principal", "secondaire", "vacant"];

    const dataType = {
        labels: labelsType,
        datasets: [
          {
            label: "Type de logement",
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            data: [datadb.nb_log_pr, datadb.nb_log_sec, datadb.nb_log_vac],
          },
        ],
      };

    const optionstype = {
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
          }
      }
    };

    const labelsAge = ["Avant 1919", "1920-1944", "1945-1969", "1970-1989", "1990-2005", "2006+"];

    const dataAge = {
      labels: labelsAge,
      datasets: [
        {
          label: "Date des logements",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.date_1919, datadb.date_1945, datadb.date_1970, datadb.date_1990, datadb.date_2005, datadb.date_2015],
        },
      ],
    };
    const optionsAge = {
      plugins: {
          legend: {
              display: true,
              position: 'bottom',
          }
      }
    }

    const labelsLogement = ["propriétaire","location","hlm","gratuit"]
    const dataLogement = {
      labels: labelsLogement,
      datasets: [
        {
          label: "Situation Résident",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848"],
          data: [datadb.nb_res_prop, datadb.nb_res_loc, datadb.nb_res_hlm, datadb.nb_res_gratuit],
        },
      ],
    };

    const optionsLogement = {
        plugins: {
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
            <CloseIcon fontSize="large"/>
          </Link>
            <ul style={{
            display: "inline",
          }}>
              <PieChart donnee={dataType} largeur={25} hauteur={25} options={{optionstype}}/>
              <BarChart donnee={dataAge} largeur={30} hauteur={35} options={{optionsAge}}/>
              <BarChart donnee={dataLogement} largeur={30} hauteur={35} options={{optionsLogement}}/>
            </ul>
          </div>
        </div>
    );
}