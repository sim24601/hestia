import React from "react";
import "../../styles/CarteClimat.css";
import store from "../../store";
import carte from '../../img/carte/catnat_sec.png';
import BarChart from "../Charts/Barchart";

export default function DashboardSecheresse() {
    const datadb = store.getState().commune.properties;
    const nb_catnat = datadb['Sécheresse'];
    const echelleCout = [0,1250,3750,7500,15000,30000];
    const coutMoyen = echelleCout[(datadb.ctsech+1)];
    const dureeResidence = datadb.anciennete_prop/datadb.nb_pop_prop;
    const dureeResidenceMois = Math.floor(12*(dureeResidence - Math.floor(dureeResidence)))
    const coutComplet = (coutMoyen+1520)*nb_catnat*dureeResidence/40
    const coutCompletRCP85 = 1.23*(coutMoyen+1520)*nb_catnat*dureeResidence/40

    const labelsCout = ["Cout Moyen", "Cout Complet", "Cout Complet RCP8.5"];

    const dataCout = {
        labels: labelsCout,
        datasets: [
          {
            backgroundColor: ["#a0d8e7","#00cdb1","#ffa641"],
            data: [coutMoyen, coutComplet, coutCompletRCP85],
          },
        ],
      };
    
      const optionsCout = {
        plugins: {
          title: {
            display: true,
            text: "Coût du risque",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      };
      
    return (
        <div>
            <ul>
                <img className="carte" src={carte}></img>
                {datadb != "" && (<div>
                <ul><p className="texte"> Commune : {datadb.nom_commune} </p>
                <p className="texte"> nombre d'occurences depuis 1984 : {nb_catnat} </p>
                <p className="texte"> coût moyen d'un sinistre : {coutMoyen} € + 1520 € de franchise </p>
                <p className="texte"> durée moyenne de résidence : {Math.floor(dureeResidence)} années {dureeResidenceMois} mois</p>
                <p className="texte"> coût complet du risque : {Math.floor(coutComplet*100)/100} € </p>
                <p className="texte"> coût complet du risque (scenario RCP8.5): {Math.floor(coutCompletRCP85*100)/100} € </p>
                <div style={{textAlign:"right", position: "absolute",left:"59%", width:"40%", height:"30%"}}><BarChart donnee={dataCout} largeur={10} hauteur={7} options={optionsCout}/> </div>
                </ul>
                </div>)}
            </ul>
        </div>
    );
}