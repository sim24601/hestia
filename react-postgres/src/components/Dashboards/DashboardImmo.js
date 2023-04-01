import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";

export default function DashboardImmo() {
    const data = store.getState().commune.properties;
    return (
        <div>
            <ul>
                <p> prix de l'immobilier : {Math.floor(data.prix,2)}€/m²</p>
                <p>permis de construire depuis 2014: {data.dempc}</p>
                <p>nombre de logement: {data.nb_log}</p>
                <p>nombre de maisons : {data.nb_maison}</p>
                <p>loyer moyen pour une maison : {Math.floor(data.loyer_maison*100)/100}€/m²</p>
                <p>nombre d'appartements : {data.nb_apt}</p>
                <p>loyer moyen pour un appartement: {Math.floor(data.loyer_apt*100)/100}€/m²</p>
            </ul>
        </div>
    );
}