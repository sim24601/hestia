import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";

export default function DashboardCommune() {
    const data = store.getState().commune.properties;
    return (
        <div>
            <ul>
                <p>{data.nom_commune}</p>
                <p> nombre de vues wikipedia par année par habitant: {Math.round(100*data.vues/(8*data.population))/100}</p>
            </ul>
        </div>
    );
}
