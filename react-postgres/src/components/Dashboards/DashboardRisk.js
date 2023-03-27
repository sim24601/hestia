import React from "react";
import "../../styles/Home.css";
import store from "../../store";
import { commune, updateCommuneCodes } from "../../stores/Commune";
import { useState } from "react";

export default function DashboardRisk() {
    const data = store.getState().commune.properties;
    return (
        <div>
            <ul>
                <p>Submersion : {data.submersion} %</p>
                <p>Inondation : {data.debordement} %</p>
                <p>argile : {data.argile/3} %</p>
            </ul>
        </div>
    );
}