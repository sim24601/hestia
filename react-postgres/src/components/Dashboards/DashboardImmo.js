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
                <p>nombre de logement: {data.nb_log}</p>
                <p>nombre d'appart : {data.nb_apt}</p>
            </ul>
        </div>
    );
}