import React, { useEffect, useState, useRef }  from "react";
import "../../styles/Home.css";
import Line from "../Charts/Line";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import store from "../../store";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import axios from "axios";
const { api_url } = require("../../settings");

export default function DetailPopulation() {
    const datadb = store.getState().commune.properties;
    const url = api_url + "/api/wiki/?codinsee=" + datadb.codinsee;

    const [histo, setHisto] = useState(null);
    const dataWiki = useRef(null);
    const optionsWiki = useRef(null);
    const [subscribe, setSubscribe] = useState(true);
  
    async function getHistoWiki() {
      const response = await axios.get(url);
      if (response.status === 200) {
        let close = response.data;
        return close;
      }
    };

    useEffect(() => {
      async function fetch() {
        let resultats = await getHistoWiki();
        if (subscribe) {
          setHisto(resultats);
        }
        if (histo != null) {
          setSubscribe(false);
          const labelsWiki = histo.map(row => row.annee);
          dataWiki.current = {
            labels: labelsWiki,
            datasets: [
                {fill: false,
                  borderColor: '#ff4848',
                  tension: 0.1,
                  data: histo.map(row => row.vues)
                },
              ],
            };
            optionsWiki.current = {
              plugins: {
                title: {
                  display: true,
                  text: "Evolution des vues wiki",
                },
                legend: {
                  display: false,
                  position: "bottom",
                },
                subtitle: {
                  display: true,
                  text: 'source wikipedia',
                  position : "bottom",
                  align : "end",
                  font: {
                  size: 11,
                  style: 'italic',
                  }
                },
              },
            };
          } 
      }
      fetch();
    }, [histo]);

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
        },
        subtitle: {
          display: true,
          text: 'source INSEE 2019',
          position : "bottom",
          align : "end",
          font: {
          size: 11,
          style: 'italic',
          }
        },
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
          display: false,
          position: "bottom",
        },
        subtitle: {
          display: true,
          text: 'source INSEE 2019',
          position : "bottom",
          align : "end",
          font: {
          size: 11,
          style: 'italic',
          }
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
          display: false,
          position: "bottom",
        },
        subtitle: {
          display: true,
          text: 'source INSEE 2019',
          position : "bottom",
          align : "end",
          font: {
          size: 11,
          style: 'italic',
          }
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
              <BarChart donnee={dataFamille} largeur={40} hauteur={40} options={optionsFamille}/>
              <BarChart donnee={dataMobilite} largeur={30} hauteur={35} options={optionsMobilite}/>
              <BarChart donnee={dataAncien} largeur={40} hauteur={40} options={optionsAncien}/>
              { dataWiki.current !== null && <Line donnee={dataWiki.current} largeur={30} hauteur={37} options={optionsWiki.current}/> }
            </ul>
          </div>
        </div>
    );
}