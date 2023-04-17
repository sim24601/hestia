import React from "react";
import "../../styles/CarteClimat.css";
import carte from '../../img/carte/catnat_gre.png';
import CloseIcon from '@mui/icons-material/Close';
import store from "../../store";

export default function DashboardGrele() {
    const datadb = store.getState().commune.properties;

    return (
        <div>
            <img className="carte" src={carte}></img>
            {datadb != "" && (<div><p className="texte"> Commune : {datadb.nom_commune} </p>
            <p className="texte"> probabilité du sinistre : {datadb['Grêle']/14600} </p>
            <p className="texte"> coût anticipé d'un sinistre : {datadb.cttgn} € </p></div>)}
        </div>
    );
}