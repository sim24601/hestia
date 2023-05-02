import React, { useEffect, useState, useRef }  from "react";
import { Link } from "react-router-dom";
import BarChart from "../Charts/Barchart";
import CloseIcon from '@mui/icons-material/Close';
import store from "../../store";
import Line from "../Charts/Line";
import "../../styles/Home.css";
import axios from "axios";
const { api_url } = require("../../settings");

export default function DetailCommune() {
    const datadb = store.getState().commune.properties;

    const url = api_url + "/api/securite/?codinsee=" + datadb.codinsee;
    const [histo, setHisto] = useState(null);
    const dataHisto = useRef(null);
    const optionsHisto = useRef(null);
    const [subscribe, setSubscribe] = useState(true);
  
    async function getHistoSecu() {
      const response = await axios.get(url);
      if (response.status === 200) {
        let close = response.data;
        return close;
      }
    };
  
    useEffect(() => {
      async function fetch() {
        let resultats = await getHistoSecu();
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
                label: 'vols',
                borderColor: '#ff4848',
                tension: 0.1,
                data: histo.map(row => row.nb_vols)
              },
              {fill: false,
                label: 'violences',
                borderColor: '#00cdb1',
                tension: 0.1,
                data: histo.map(row => row.nb_violences)
              },
              {fill: false,
                label: 'cambriolages',
                borderColor: '#ffc638',
                tension: 0.1,
                data: histo.map(row => row.nb_cambriolages)
              },
              ],
            };
            optionsHisto.current = {
              plugins: {
                title: {
                  display: true,
                  text: "Evolution des faits",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
                subtitle: {
                  display: true,
                  text: 'source Police/Gendarmerie',
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


    const labelsSecurite= ["Vols", "Violences", "Cambriolages"];
    const dataSecurite = {
        labels: labelsSecurite,
        datasets: [
          { label: "pourcentage par habitant / logement",
            backgroundColor: ["#a0d8e7", "#00cdb1", "#ffc638"],
            borderRadius : 4,
            maxBarThickness : 30,
            data: [100*datadb.vols/(datadb.population*7), 100*datadb.violences/(datadb.population*7), 100*datadb.cambriolages/(datadb.nb_log*7)],
          },
        ],
    };

        const optionsSecurite = {
            plugins: {
              title: {
                display: true,
                text: "Pourcentage de faits par habitant par an",
              },
              legend: {
                    display: false,
                  position: "bottom",
              },
              subtitle: {
                display: true,
                text: 'source Police/Gendarmerie 2016-2022',
                position : "bottom",
                align : "end",
                font: {
                size: 11,
                style: 'italic',
                }
              },
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
          text: "Nombre d'équipements",
        },
        subtitle: {
          display: true,
          text: 'source INSEE 2021',
          position : "bottom",
          align : "end",
          font: {
            size: 11,
            style: 'italic',
          }
        },
        legend: {
              display: false,
              position: "bottom",
          }
      }
    };

    const labelsDistance = ["Bordeaux", "Lille", "Lyon", "Paris", "Marseille", "Rennes"];

    const dataDistance = {
      labels: labelsDistance,
      datasets: [
        { label: "Durée de trajet en minutes",
          backgroundColor: "#ffc638",
          borderColor: "#ffc638",
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.bordeaux, datadb.lille, datadb.lyon, datadb.paris, datadb.marseille, datadb.rennes],
        },
      ],
    };
    const optionsDistance = {
      plugins: {
        title: {
          display: true,
          text: "Durée de trajet en minutes",
        },
        legend: {
            display: false,
        },
        subtitle: {
          display: true,
          text: 'source OSM 2023',
          position : "bottom",
          align : "end",
          font: {
          size: 11,
          style: 'italic',
          }
        },
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
            <BarChart donnee={dataActivite} largeur={30} hauteur={37} options={optionsActivite}/>
            <BarChart donnee={dataDistance} largeur={30} hauteur={37} options={optionsDistance}/>
            <BarChart donnee={dataSecurite} largeur={30} hauteur={37} options={optionsSecurite}/>
            { dataHisto.current !== null && <Line donnee={dataHisto.current} largeur={30} hauteur={37} options={optionsHisto.current}/> }
          </div>
        </div>
    );
}