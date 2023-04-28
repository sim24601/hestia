import store from "../../store";
import "../../styles/Home.css";
import React, { useEffect, useState, useRef }  from "react";
import { Link } from "react-router-dom";
import Line from "../Charts/Line";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
const { api_url } = require("../../settings");

export default function DetailClimat() {
    const datadb = store.getState().commune.properties;
    const url = api_url + "/api/meteo/";
    let urlgeoParams = {
      lat: datadb.latitude,
      lon: datadb.longitude,
    };
    const [histo, setHisto] = useState(null);
    const dataHisto = useRef(null);
    const optionsHisto = useRef(null);
    const [subscribe, setSubscribe] = useState(true);
  
    async function getHistoMeteo() {
      const response = await axios.get(url, {params: urlgeoParams,});
      if (response.status === 200) {
        let close = response.data;
        return close;
      }
    };

    useEffect(() => {
      async function fetch() {
        let resultats = await getHistoMeteo();
        console.log('success ok', resultats);
        if (subscribe) {
          setHisto(resultats);
        }
        if (histo != null) {
          setSubscribe(false);
          const labelsHisto = histo.map(row => row.annee);
          dataHisto.current = {
            labels: labelsHisto,
            datasets: [
                {fill: false,
                  label: 'max',
                  borderColor: '#ff4848',
                  tension: 0.1,
                  data: histo.map(row => row.temperature_max)
                },
                {fill: false,
                  label: 'min',
                  borderColor: '#00cdb1',
                  tension: 0.1,
                  data: histo.map(row => row.temperature_min)
                },
                {fill: false,
                  label: 'mediane',
                  borderColor: '#ffc638',
                  tension: 0.1,
                  data: histo.map(row => row.temperature_mediane)
                },
              ],
            };
            optionsHisto.current = {
              plugins: {
                title: {
                  display: true,
                  text: "Evolution des temperatures",
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
    }, [histo]);

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
               { dataHisto.current !== null && <Line donnee={dataHisto.current} largeur={30} hauteur={40} options={optionsHisto.current}/> }
              <BarChart donnee={dataMeteo} largeur={30} hauteur={35} options={optionsMeteo}/>
              <BarChart donnee={dataTemperature} largeur={30} hauteur={35} options={optionsTemperature}/>
            </ul>
          </div>
        </div>
    );
}