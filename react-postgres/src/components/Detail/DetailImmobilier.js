import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import CloseIcon from '@mui/icons-material/Close';
import store from "../../store";
import "../../styles/Home.css";

export default function DetailImmobilier() {
    const datadb = store.getState().commune.properties;

    const labelsType = ["principal", "secondaire", "vacant"];

    const dataType = {
        labels: labelsType,
        datasets: [
          {
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            data: [datadb.nb_log_pr, datadb.nb_log_sec, datadb.nb_log_vac],
          },
        ],
      };

    const optionstype = {
      plugins: {
        title: {
          display: true,
          text: "Type de logement",
        },
        legend: {
          display: true,
          position: "bottom",
        },
      },
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
          data: [datadb.Date_1919, datadb.Date_1945, datadb.Date_1970, datadb.Date_1990, datadb.Date_2005, datadb.Date_2015],
        },
      ],
    };
    const optionsAge = {
      plugins: {
        title: {
          display: true,
          text: "Date de consturction des batiments",
        },
          legend: {
              display: false,
          }
      }
    };

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
        title: {
          display: true,
          text: "Situation immobilière des résidents",
        },
        legend: {
          display: false,
          position: "bottom",
        },
      },
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
              <PieChart donnee={dataType} largeur={25} hauteur={25} options={optionstype}/>
              <BarChart donnee={dataAge} largeur={30} hauteur={35} options={optionsAge}/>
              <BarChart donnee={dataLogement} largeur={30} hauteur={35} options={optionsLogement}/>
            </ul>
          </div>
        </div>
    );
}