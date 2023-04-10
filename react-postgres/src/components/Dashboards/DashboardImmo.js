import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import PieChart from "../Charts/Piechart";
import BarChart from "../Charts/Barchart";

export default function DashboardImmo() {
    const data = store.getState().commune.properties;

    const labelsClasse = ["appartement","maison"]
    const dataClasse = {
      labels: labelsClasse,
      datasets: [
        {
          label: "nombre",
          backgroundColor: ["#a0d8e7","#00cdb1"],
          data: [data.nb_apt, data.nb_maison],
        },
      ],
    };

    const optionsClasse = {
      plugins: {
        responsive : true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Proportion apt / maison",
        },
        legend: {
          display: true,
          position: "bottom",
        },
      },
    };

    const labelsLoyer = ["appartement","maison"]
    const dataLoyer = {
      labels: labelsLoyer,
      datasets: [
        {
          label: "Loyer en €/m²",
          backgroundColor: ["#a0d8e7","#00cdb1"],
          data: [Math.floor(data.loyer_apt*100)/100, Math.floor(data.loyer_maison*100)/100],
        },
      ],
    };

    const optionsLoyer = {
      plugins: {
        responsive : true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Loyer en €/m²",
        },
        legend: {
          display: false,
          position: "right",
        },
      },
    };
    const styleChart = {
    margin: '-5',
    padding: '-3',
    position: 'absolute',
    left:'1vw',
    bottom:'-1.5vw',
    height: '14vw',
    width:'25vw',
    columnCount:'2'};

    return (
        <div>
            <ul>
                <p> prix de l'immobilier : {Math.floor(data.prix,2)}€/m²</p>
                <p>nombre de logement: {data.nb_log}</p>
                <p style={styleChart}><PieChart donnee={dataClasse} largeur={50} hauteur={50} options={optionsClasse}/>
                <BarChart donnee={dataLoyer} largeur={60} hauteur={60} options={optionsLoyer}/></p>
            </ul>
        </div>
    );
}