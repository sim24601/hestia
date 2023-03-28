import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";

export default function DashboardRisk() {
    const data = store.getState().commune.properties;
    return (
        <div>
                <p>Submersion : {Math.floor(data.submersion*10000)/100} % 
                argile : {Math.floor(data.argile*100/3)} %
                Inondation : {Math.floor(data.debordement*10000)/100} %</p>
        </div>
    );
}