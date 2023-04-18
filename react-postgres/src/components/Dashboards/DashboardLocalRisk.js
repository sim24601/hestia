import React from "react";
import "../../styles/CarteClimat.css";
import store from "../../store";
import BarChart from "../Charts/Barchart";
import PieChart from "../Charts/Piechart";

export default function DashboardLocalRisk() {
    const datadb = store.getState().commune.properties;
    const nb_inondation = datadb['Inondations.et.ou.Coulées.de.Boue'];
    const nb_submersion = datadb['Chocs.Mécaniques.liés.à.l.action.des.Vagues'];
    const nb_tempete = datadb['Tempête'];
    const nb_grele = datadb['Grêle'];
    const nb_mvt = datadb['Mouvement.de.Terrain'];
    const nb_secheresse = datadb['Sécheresse'];
    const coutMoyenTG = datadb.cttgn;
    const echelleCout = [0,1250,3750,7500,15000,30000];
    const coutMoyenIS = echelleCout[datadb.ctinon];
    const coutMoyenSEC = echelleCout[datadb.ctsech];
    const coutMoyenMVT = echelleCout[datadb.ctmvt];
    const dureeResidence = datadb.anciennete_prop/datadb.nb_pop_prop;
    const dureeResidenceMois = Math.floor(12*(dureeResidence - Math.floor(dureeResidence)))
    const coutTempete = (coutMoyenTG+380)*nb_tempete*dureeResidence/40
    const coutGrele = (coutMoyenTG+380)*nb_grele*dureeResidence/40
    const coutMvt = (coutMoyenMVT+1520)*nb_mvt*dureeResidence/40
    const coutSecheresse = (coutMoyenSEC+1520)*nb_secheresse*dureeResidence/40
    const coutInondation = (coutMoyenIS+380)*nb_inondation*dureeResidence/40
    const coutSubmersion = (coutMoyenIS+380)*nb_submersion*dureeResidence/40
    const coutTempeteRCP85 = coutTempete * 1.35
    const coutGreleRCP85 = coutGrele * 1.35
    const coutMvtRCP85 = coutMvt * 1.23
    const coutSecheresseRCP85 = coutSecheresse * 1.23
    const coutInondationRCP85 = coutInondation * 1.38
    const coutSubmersionRCP85 = coutSubmersion * 1.82
    const coutTotal = coutTempete + coutGrele + coutMvt + coutSecheresse + coutInondation + coutSubmersion
    const coutTotalRCP85 = coutTempeteRCP85 + coutGreleRCP85 + coutMvtRCP85 + coutSecheresseRCP85 + coutInondationRCP85 + coutSubmersionRCP85

    const labelsCout = ["Tempete", "Grele", "Mouvement de terrain", "Sécheresse","Inondation", "Submersion"];

    const dataCout = {
        labels: labelsCout,
        datasets: [
          {
            backgroundColor: ["#ffc638", "#ffdede","#ffa641", "#ff4848", "#a0d8e7","#00cdb1"],
            data: [coutTempete, coutGrele, coutMvt, coutSecheresse, coutInondation, coutSubmersion],
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

      const labelsCoutRCP = ["Tempete", "Grele", "Mouvement de terrain", "Sécheresse","Inondation", "Submersion"];

      const dataCoutRCP = {
          labels: labelsCoutRCP,
          datasets: [
            {
              backgroundColor: ["#ffc638", "#ffdede","#ffa641", "#ff4848", "#a0d8e7","#00cdb1"],
              data: [coutTempeteRCP85, coutGreleRCP85, coutMvtRCP85, coutSecheresseRCP85, coutInondationRCP85, coutSubmersionRCP85],
            },
          ],
        };
      
        const optionsCoutRCP = {
          plugins: {
            title: {
              display: true,
              text: "Coût du risque en 2050 (scénario RCP8.5 à +2 degrés Celsius)",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        };
    return(
        <div>
            <div className="schema">
                <PieChart donnee={dataCout} largeur={10} hauteur={10} options={optionsCout}/>
            </div>
            {/* <div className="schema1">
                <PieChart donnee={dataCoutRCP} largeur={10} hauteur={10} options={optionsCoutRCP}/>
            </div> */}
            <ul>
                <p className="texte"> Commune : {datadb.nom_commune} </p>
                <p className="texte"> durée moyenne de résidence : {Math.floor(dureeResidence)} années {dureeResidenceMois} mois</p>
                <p className="texte"> Cout total du risque : {Math.floor(coutTotal*100)/100} € </p>
                <p className="texte"> Cout total du risque mensuel : {Math.floor(100*coutTotal/(dureeResidence*12+ dureeResidenceMois))/100} € </p>
                <p className="texte"> Cout total du risque annuel: {Math.floor(100*coutTotal/dureeResidence)/100} € </p>
                <p className="texte"> Cout total du risque RCP 8.5 : {Math.floor(coutTotalRCP85*100)/100} € </p>   
                <p className="texte"> Cout total du risque RCP 8.5 mensuel : {Math.floor(100*coutTotalRCP85/(dureeResidence*12+ dureeResidenceMois)/100)} € </p>
                <p className="texte"> Cout total du risque RCP 8.5 annuel: {Math.floor(100*coutTotalRCP85/dureeResidence)/100} € </p>
            </ul>
        </div>
    )
}