import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";

export default function DashboardPopulation() {
    const data = store.getState().commune.properties;
    return (
        <div>
            <p>population : {data.population}</p>
            <p>revenu median : {data.revenu_median}</p>
            <p>part de centenaires : {Math.round(data.pop_100/data.population*100)/100} %</p>
            
        </div>
    );
}