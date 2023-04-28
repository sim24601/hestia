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

  async function getHistoImmo() {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('SUCCESS 1 ', response)
      let close = response.data;
      return close;
    }
  };

  useEffect(() => {

    let subscribe = true;
    async function fetch() {
      let resultats = await getHistoImmo();
      if (subscribe) {
        setHisto(resultats);
      }
      if (histo != null) {
        const labelsHisto = histo.map(row => row.annee_mutation);
        dataHisto.current = {
          labels: labelsHisto,
          datasets: [
              {
                data: histo.map(row => row.round)
              },
            ],
          };
          optionsHisto.current = {
            plugins: {
              title: {
                display: true,
                text: "Evolution Logement",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          };
        } 
    }
    
    fetch();
    return () => subscribe = false;
  }, [histo]);

    console.log('SUCCESS 2 ', histo);

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
          data: [datadb.date_1919, datadb.date_1945, datadb.date_1970, datadb.date_1990, datadb.date_2005, datadb.date_2015],
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
              <PieChart donnee={dataType} largeur={30} hauteur={35} options={optionstype}/>
              { dataHisto.current !== null && <Line donnee={dataHisto.current} largeur={30} hauteur={35} options={optionsHisto.current}/> }
              {/* <BarChart donnee={dataAge} largeur={30} hauteur={35} options={optionsAge}/> */}
              <BarChart donnee={dataLogement} largeur={30} hauteur={35} options={optionsLogement}/>
            </ul>
          </div>
        </div>
    );
}