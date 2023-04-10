import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import BarChart from "../Charts/Barchart";

export default function DashboardCommune() {
    const datadb = store.getState().commune.properties;
    const labelsActivite= ["Services", "Commerces", "Enseignement", "Sante", "Transports"];

    const dataActivite = {
      labels: labelsActivite,
      datasets: [
        { label: "nombre",
          backgroundColor: ["#a0d8e7","#00cdb1","#ffa641", "#ff4848", "#ffc638"],
          borderRadius : 4,
          maxBarThickness : 30,
          data: [datadb.Services, datadb.Commerces, datadb.Enseignement, datadb.Sante, datadb.Transports],
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
              display: true,
              position: "bottom",
          }
      }
    };
    const styleChart = {
        margin: '0',
        padding: '0',
        position: 'absolute',
        right:'1vw',
        bottom:'1vw',
        height: '10vw',
        width:'25vw'};

    return (
        <div>
            <ul>
                <p>{datadb.nom_commune}</p>
                <p> Vues wiki: {Math.round(100*datadb.vues/(8*datadb.population))/100}</p>
                <p style={styleChart}><BarChart donnee={dataActivite} largeur={45} hauteur={25} options={optionsActivite}/></p>
            </ul>
        </div>
    );
}
