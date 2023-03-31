import React from "react";
import "../../styles/Home.css";
import store from "../../store";

export default function DashboardPopulation() {
    const datadb = store.getState().commune.properties;

    return (
        <div>
          <ul>
            <p>population : {datadb.population}</p>
            <p>revenu median : {datadb.revenu_median}</p>
          </ul>
        </div>
    );
}