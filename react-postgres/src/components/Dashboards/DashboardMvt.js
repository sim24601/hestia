import React from "react";
import "../../styles/CarteClimat.css";
import carte from '../../img/carte/catnat_mvt.png';
import store from "../../store";

export default function DashboardMvt() {
    const datadb = store.getState().commune.properties;
    return (
        <div>
                <img className="carte" src={carte}></img>
            {datadb != "" && (<div><p className="texte"> Commune : {datadb.nom_commune} </p>
            <p className="texte"> probabilité du sinistre : {datadb['Mouvement.de.Terrain']/14600} </p>
            <p className="texte"> coût anticipé d'un sinistre : {Math.pow(10,datadb.ctmvt)} € </p></div>)}
        </div>
    );
}