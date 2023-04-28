import React from "react";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import store from "../../store";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import "../../styles/Home.css";

export default function DetailPopulation() {
    const datadb = store.getState().commune.properties;

    const labelsMobilite = ["local", "commune", "departement", "region", "national", "international"];

    const dataMobilite = {
      labels: labelsMobilite,
      datasets: [
        { label: "nombre",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.nb_tra_loc, datadb.nb_tra_com, datadb.nb_tra_dep, datadb.nb_tra_reg, datadb.nb_tra_nat, datadb.nb_tra_int],
        },
      ],
    };
    const optionsMobilite = {
      plugins: {
        title: {
          display: true,
          text: "Lieu de Travail",
        },
          legend: {
              display: false,
          }
      }
    };

    const labelsTransport = ["marche", "velo", "moto", "auto", "transport"];

    const dataTransport = {
      labels: labelsTransport,
      datasets: [
        { label: "nombre",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848", "#ffc638"],
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.nb_tra_marche, datadb.nb_tra_velo, datadb.nb_tra_moto, datadb.nb_tra_auto, datadb.nb_tra_transp],
        },
      ],
    };
    const optionsTransport = {
      plugins: {
        title: {
          display: true,
          text: "Mode de transports",
        },
          legend: {
              display: true,
              position: "bottom",
          }
      }
    };

    const labelsAncien = ["0-2 ans", "2-4 ans", "4-9 ans", "10+ ans"];
    const dataAncien = {
      labels: labelsAncien,
      datasets: [
        { 
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848"],
          data: [datadb.pop_log_2a, datadb.pop_log_4a, datadb.pop_log_9a, datadb.pop_log_10plus],
        },
      ],
    };
    const optionsAncien = {
      plugins: {
        title: {
          display: true,
          text: "Durée de résidence dans la commune",
        },
        legend: {
          display: true,
          position: "bottom",
        },
      },
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

    const optionsFamille = {
      plugins: {
        title: {
          display: true,
          text: "Situation familiale des ménages",
        },
        legend: {
          display: true,
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
            <CloseIcon className="icon-close" fontSize="medium"/>
          </Link>
            <ul style={{
            display: "inline",
          }}>
              <PieChart donnee={dataFamille} largeur={40} hauteur={40} options={optionsFamille}/>
              <BarChart donnee={dataMobilite} largeur={30} hauteur={35} options={optionsMobilite}/>
              <PieChart donnee={dataTransport} largeur={30} hauteur={35} options={optionsTransport}/>
              <PieChart donnee={dataAncien} largeur={40} hauteur={40} options={optionsAncien}/>
            </ul>
          </div>
        </div>
    );
}