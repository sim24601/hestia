import React from "react";
import "../../styles/CarteClimat.css";
import store from "../../store";
import PieChart from "../Charts/Piechart";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DashboardLocalRisk() {
    const datadb = store.getState().commune.properties;
    const nb_inondation = datadb['inondations.et.ou.coulées.de.boue'];
    const nb_submersion = datadb['chocs.mécaniques.liés.à.l.action.des.vagues'];
    const nb_tempete = datadb['tempête'];
    const nb_grele = datadb['grêle'];
    const nb_mvt = datadb['mouvement.de.terrain'];
    const nb_secheresse = datadb['sécheresse'];
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
            text: "Repartition du coût des sinistres",
          },
          legend: {
            display: true,
            position: "right",
          },
          subtitle: {
            display: true,
            text: 'source France Assureurs',
            position : "bottom",
            align : "end",
            font: {
            size: 11,
            style: 'italic',
            }
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
              text: "Coût du risque en 2050",
            },
            legend: {
              display: true,
              position: "right",
            },
            subtitle: {
              display: true,
              text: 'source France Assureurs',
              position : "bottom",
              align : "end",
              font: {
              size: 11,
              style: 'italic',
              }
            },
          },
        };
    return(
        <div>
            <p className="graph-container">
            <div className="schema">
                <PieChart donnee={dataCout} largeur={90} hauteur={35} options={optionsCout}/>
            </div>
            {/* <div className="schema1">
                <PieChart donnee={dataCoutRCP} largeur={90} hauteur={35} options={optionsCoutRCP}/>
            </div> */}
            </p>
            <ul>
                <p className="localRisqueDescription"> Scénario sur la commune de {datadb.nom_commune} </p>
                <p className="localRisqueDescription"> Durée moyenne de résidence : {Math.floor(dureeResidence)} années {dureeResidenceMois} mois</p>
            </ul>
            <br />
            <TableContainer className="localRisqueDescription" sx={{width: "35vw"}} component={Paper}>
            <Table aria-label="couts actuels" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Situation actuelle</TableCell>
                  <TableCell align="right">Coût en €</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût mensuel
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(100*coutTotal/(dureeResidence*12))/100)} €</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût annuel
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(100*coutTotal/dureeResidence)/100)} €</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût sur la durée de résidence
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(coutTotal*100)/100)} €</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <TableContainer className="localRisqueDescription" sx={{width: "35vw" }} component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Extrapolation en 2050, scénario de +2°C</TableCell>
                  <TableCell align="right">Coût en €</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût mensuel
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(100*coutTotalRCP85/(dureeResidence*12))/100)} €</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût annuel
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(100*coutTotalRCP85/dureeResidence)/100)} €</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    Coût sur la durée de résidence
                    </TableCell>
                    <TableCell align="right">{Intl.NumberFormat('fr-FR').format(Math.floor(coutTotalRCP85*100)/100)} €</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
        </div>
    )
}