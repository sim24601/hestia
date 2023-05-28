import React from "react";
import "../../styles/CarteClimat.css";
import carte from '../../img/carte/catnat_gre.png';
import store from "../../store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DashboardGrele() {
    const datadb = store.getState().commune.properties;
    const nb_catnat = datadb['grêle'];
    const coutMoyen = datadb.cttgn;
    const dureeResidence = datadb.anciennete_prop/datadb.nb_pop_prop;
    const dureeResidenceMois = Math.floor(12*(dureeResidence - Math.floor(dureeResidence)))
    const coutComplet = (coutMoyen+380)*nb_catnat*dureeResidence/40
    const coutCompletRCP85 = 1.35*(coutMoyen+380)*nb_catnat*dureeResidence/40

    return (
        <div>
            <img className="carte" src={carte}></img>
            {datadb != "" && (<div>
            <ul>
            <TableContainer className="texte" sx={{width: "37vw"}} component={Paper}>
            <Table aria-label="Top 5 des communes à risques" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Rang</TableCell>
                  <TableCell>Commune</TableCell>
                  <TableCell>Nb.</TableCell>
                  <TableCell>Coût Moyen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    1
                    </TableCell>
                    <TableCell>Le Bouscat</TableCell>
                    <TableCell align="center">4</TableCell>
                    <TableCell>1615.85 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    2
                    </TableCell>
                    <TableCell>Doué-en-Anjou</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell>1317.86 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    3
                    </TableCell>
                    <TableCell>Gennes-Val-de-Loire</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell>1317,86 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    4
                    </TableCell>
                    <TableCell>Les Garennes sur Loire</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell>1317.86 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    5
                    </TableCell>
                    <TableCell>Neuillé</TableCell>
                    <TableCell align="center">3</TableCell>
                    <TableCell>1317.86 €</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    ...
                    </TableCell>
                    <TableCell>...</TableCell>
                    <TableCell align="center">...</TableCell>
                    <TableCell>...</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    /
                    </TableCell>
                    <TableCell>{datadb.nom_commune}</TableCell>
                    <TableCell align="center">{nb_catnat}</TableCell>
                    <TableCell>{datadb.cttgn}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
        </ul>
        </div>)}
        </div>
    );
}