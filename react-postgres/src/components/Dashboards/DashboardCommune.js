import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import BarChart from "../Charts/Barchart";

export default function DashboardCommune() {
    const datadb = store.getState().commune.properties;

    return (
        <div>
            <ul>
                <p>{datadb.nom_commune} - {datadb.statut} </p>
                <p>Altitude : {datadb.altitude}m   |   Superficie : {datadb.superficie/100} km² </p>
            </ul>
        </div>
    );
}
