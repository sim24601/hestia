import React from "react";
import "../../styles/CarteClimat.css";
import carte from '../../img/carte/catnat_ino.png';
import store from "../../store";

export default function DashboardInondation() {
    const datadb = store.getState().commune.properties;
    return (
        <div>
            <img className="carte" src={carte}></img>
            {datadb != "" && (<div><p className="texte"> Commune : {datadb.nom_commune} </p>
            <p className="texte"> probabilité du sinistre : {datadb['Inondations.et.ou.Coulées.de.Boue']/14600} </p>
            <p className="texte"> coût anticipé d'un sinistre : {Math.pow(10,datadb.ctinon)} € </p></div>)}
        </div>
    );
}