import React from "react";
import "../../styles/CarteClimat.css";
import store from "../../store";
import carte from '../../img/carte/catnat_sec.png';

export default function DashboardSecheresse() {
    const datadb = store.getState().commune.properties;
    return (
        <div>
            <ul>
                <img className="carte" src={carte}></img>
                {datadb != "" && (<div><p className="texte"> Commune : {datadb.nom_commune} </p>
                <p className="texte"> probabilité du sinistre : {datadb['Sécheresse']/14600} </p>
                <p className="texte"> coût anticipé d'un sinistre : {Math.pow(10,datadb.ctsech)} € </p></div>)}
            </ul>
        </div>
    );
}