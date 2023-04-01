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
            <p>anncienneté moyenne dans la commune : {Math.floor(100*datadb.anciennete_pop/datadb.population)/100}</p>
            <p>taux de réussite au bac : {Math.floor(100*datadb.taux_reussite_bac)/100}</p>
            <p>taux de mention au bac : {Math.floor(100*datadb.taux_mention)/100}</p>
          </ul>
        </div>
    );
}