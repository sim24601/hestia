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
                subtitle: {
                  display: true,
                  text: 'source SYNOP 2014-2022',
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

    const labelsVehicule = ["Parking privé", "Menage avec 1 voiture", "Menage avec 2 voitures"];

    const dataVehicule = {
        labels: labelsVehicule,
        datasets: [
          {
            label: "Vehicule",
            backgroundColor: ["#ff4848","#00cdb1","#ffa641"],
            borderColor: "grey",
            borderWidth:0,
            data: [datadb.nb_res_parking, datadb.menages_1auto, datadb.menages_2autos],
          },
        ],
      };

    const optionsVehicule = {
      plugins: {
        title: {
          display: true,
          text: "Equipements automobiles dans la commune",
        },
        legend: {
            display: false,
            position: 'bottom',
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

    const labelsChauffage = ["Chauffage collectif", "Chauffage individuel non elec", "Chauffage individuel électrique"];

    const dataChauffage = {
        labels: labelsChauffage,
        datasets: [
          {
            label: "Chauffage",
            backgroundColor: ["#00cdb1","#ffc638","#a0d8e7"],
            data: [datadb.nb_res_cc, (datadb.nb_res_ci-datadb.nb_res_ce), datadb.nb_res_ce],
          },
        ],
      };

    const optionsChauffage = {
      plugins: {
        title: {
          display: true,
          text: "Mode de chauffage des residences",
        },
        legend: {
            display: true,
            position: 'bottom',
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

    const labelsMeteo = ["tempêtes", "vents violents", "pluie forte"];

    const dataMeteo = {
      labels: labelsMeteo,
      datasets: [
        {
          label: "",
          backgroundColor: ["#00cdb1","#ffa641", "#a0d8e7", "#ffc638"],
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
            text: "Nombres d'évènements météo depuis 2014",
          },
          legend: {
              display: false,
              position: 'bottom',
          },
          subtitle: {
            display: true,
            text: 'source SYNOP 2014-2022',
            position : "bottom",
            align : "end",
            font: {
            size: 11,
            style: 'italic',
            }
          },
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
              <BarChart donnee={dataVehicule} largeur={30} hauteur={38} options={optionsVehicule}/>
              <PieChart donnee={dataChauffage} largeur={30} hauteur={38} options={optionsChauffage}/>
              <BarChart donnee={dataMeteo} largeur={30} hauteur={38} options={optionsMeteo}/>
              { dataHisto.current !== null && <Line donnee={dataHisto.current} largeur={30} hauteur={38} options={optionsHisto.current}/> }
          </div>
        </div>
    );
}