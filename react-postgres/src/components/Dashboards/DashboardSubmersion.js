import React from "react";
import "../../styles/CarteClimat.css";
import carte from '../../img/carte/catnat_sub.png';
import store from "../../store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DashboardSubmersion() {
    const datadb = store.getState().commune.properties;
    const nb_catnat = datadb['chocs.mécaniques.liés.à.l.action.des.vagues'];
    const echelleCout = ["0€","0-2,5 k€","2,5-5 k€","5-10 k€","10-20 k€","+ de 20 k€"];
    const echelleSp = ["0","0-10%","10-50%","50-100%","100-200%","+ de 200%"];
    const coutMoyen = echelleCout[datadb.ctinon];
    const dureeResidence = datadb.anciennete_prop/datadb.nb_pop_prop;
    const dureeResidenceMois = Math.floor(12*(dureeResidence - Math.floor(dureeResidence)))
    const coutComplet = (coutMoyen+380)*nb_catnat*dureeResidence/40
    const coutCompletRCP85 = 1.82*(coutMoyen+380)*nb_catnat*dureeResidence/40


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
                  <TableCell>Sinistre / primes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    1
                    </TableCell>
                    <TableCell>Antibes</TableCell>
                    <TableCell align="center">14</TableCell>
                    <TableCell>{echelleCout[0]}</TableCell>
                    <TableCell>{echelleSp[0]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    2
                    </TableCell>
                    <TableCell>Nice</TableCell>
                    <TableCell align="center">14</TableCell>
                    <TableCell>{echelleCout[4]}</TableCell>
                    <TableCell>{echelleSp[1]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    3
                    </TableCell>
                    <TableCell>Cannes</TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell>{echelleCout[3]}</TableCell>
                    <TableCell>{echelleSp[1]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    4
                    </TableCell>
                    <TableCell>Cagnes-sur-Mer</TableCell>
                    <TableCell align="center">12</TableCell>
                    <TableCell>{echelleCout[4]}</TableCell>
                    <TableCell>{echelleSp[21]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    5
                    </TableCell>
                    <TableCell>Menton</TableCell>
                    <TableCell align="center">11</TableCell>
                    <TableCell>{echelleCout[4]}</TableCell>
                    <TableCell>{echelleSp[3]}</TableCell>
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
                    <TableCell>{echelleCout[datadb.ctinon]}</TableCell>
                    <TableCell>{echelleSp[datadb.spinon]}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
        </ul>
        </div>)}
        </div>
    );
}