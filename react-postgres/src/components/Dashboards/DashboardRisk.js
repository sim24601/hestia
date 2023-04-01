import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";
import PolarArea from "../Charts/PolarArea";

export default function DashboardRisk() {
    const datadb = store.getState().commune.properties;

    return (
        <div>
            <ul>
            <p>Superficie incendiées par la superficie de la sommune depuis 2014 : {datadb.incendies}</p>
            <p>taux d'ensoleillement : {Math.floor(datadb.ensoleillement*100)/100} %</p>
            </ul>
        </div>
    );
}