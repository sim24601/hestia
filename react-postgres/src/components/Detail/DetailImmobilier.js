import React, { useEffect, useState, useRef }  from "react";
import { Link } from "react-router-dom";
import Line from "../Charts/Line";
import "../../styles/Home.css";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import CloseIcon from '@mui/icons-material/Close';
import store from "../../store";
import "../../styles/Home.css";
import axios from "axios";
const { api_url } = require("../../settings");

export default function DetailImmobilier() {
  const datadb = store.getState().commune.properties;
  const url = api_url + "/api/histodvf/?codinsee=" + datadb.codinsee;
  const [histo, setHisto] = useState(null);
  const dataHisto = useRef(null);
  const optionsHisto = useRef(null);
  const [subscribe, setSubscribe] = useState(true);

  async function getHistoImmo() {
    const response = await axios.get(url);
    if (response.status === 200) {
      let close = response.data;
      return close;
    }
  };

  useEffect(() => {
    async function fetch() {
      let resultats = await getHistoImmo();
      if (subscribe) {
        setHisto(resultats);
      }
      if (histo != null) {
        setSubscribe(false);
        const labelsHisto = histo.map(row => row.annee_mutation);
        dataHisto.current = {
          labels: labelsHisto,
          datasets: [
              {fill: false,
                borderColor: '#ff4848',
                tension: 0.1,
                data: histo.map(row => row.round)
              },
            ],
          };
          optionsHisto.current = {
            plugins: {
              title: {
                display: true,
                text: "Evolution des prix Logement",
              },
              legend: {
                display: false,
                position: "bottom",
              },
              subtitle: {
                display: true,
                text: 'source DVF 2023',
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
        title: {
          display: true,
          text: "Date de construction des batiments",
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
            <CloseIcon className="icon-close" fontSize="large"/>
          </Link>
              <BarChart donnee={dataAge} largeur={30} hauteur={38} options={optionsAge}/>
              <PieChart donnee={dataType} largeur={30} hauteur={38} options={optionstype}/>
              <BarChart donnee={dataLogement} largeur={30} hauteur={38} options={optionsLogement}/>
              { dataHisto.current !== null && <Line donnee={dataHisto.current} largeur={30} hauteur={37} options={optionsHisto.current}/> }
          </div>
        </div>
    );
}