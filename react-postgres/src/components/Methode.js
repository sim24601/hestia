import React, { useState, useCallback }  from "react";
import "../styles/Methode.css";
import store from "../store";
import GiteIcon from '@mui/icons-material/Gite';
import Button from '@mui/material/Button';
import axios from "axios";
import TextField from '@mui/material/TextField';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
const { api_url2 } = require("../settings");

function Methode() {
    const datadb = store.getState().commune.properties;
    const url = api_url2 + "/getprediction";
    const [estimation, setEstimation] = useState('');
    const [mestimation, setMestimation] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [edited,setEdited] = useState(false);
    const { geom, geom_commune, ...input} = datadb
    const [custom, setCustom] = useState(input);

    async function estimate(arg1, arg2) {
        console.log('SUCCESS 0 : ', arg1)
        await axios.get(url, {
                    params: {
                    bins: JSON.stringify(arg1),
                  }
        })
        .then(function(response) {
            if (response.status === 200) {
                console.log('status 3 à ',arg2)
                let close = response.data[0][".pred"];
                console.log('SUCCESS 1 :', close, " avec edited  à ", edited);
                if (!arg2) {
                    setEstimation(close);
                }
                if (arg2) {
                    setMestimation(close);
                    setEdited(false);
                }
            }
        })
        .catch(function(error) {
            console.log('alerte générale', error)
        });
    };

    function edition() {
        // setEdited(true);
        const alpha = true;
        console.log('status à ',alpha);
        lancement(custom, alpha);
    }

    const lancement = useCallback(async (entree, alpha) => {
        async function fetch(arg1, alpha) {
          await estimate(arg1, alpha);
        }
        if (isSending) return
        setIsSending(true);
        console.log('status 2 à ',alpha)
        fetch(entree, alpha);
        setIsSending(false);
    }, [isSending])

    return (
        <div className="methode-container">
            <div id="input" className="container">
                <p>Saisie des paramètres personnalisés</p>
                <TextField id="filled-basic" label="nombre de logements" variant="filled" defaultValue={datadb.nb_log} onChange={(e)=>{setCustom({...custom, nb_log: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="revenu median en €" variant="filled" defaultValue={datadb.revenu_median} onChange={(e)=>{setCustom({...custom, revenu_median: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="loyer moyen en €/m2" variant="filled" defaultValue={datadb.loyer_apt} onChange={(e)=>{setCustom({...custom, loyer_apt: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de vues wiki" variant="filled" defaultValue={datadb.vues} onChange={(e)=>{setCustom({...custom, vues: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de cambriolages" variant="filled" defaultValue={datadb.cambriolages} onChange={(e)=>{setCustom({...custom, cambriolages: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de permis de construire" variant="filled" defaultValue={datadb.dempc} onChange={(e)=>{setCustom({...custom, dempc: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de commerces" variant="filled" defaultValue={datadb.commerces} onChange={(e)=>{setCustom({...custom, commerces: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="équipements de santé" variant="filled" defaultValue={datadb.commerces} onChange={(e)=>{setCustom({...custom, commerces: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="temps de trajet à Paris" variant="filled" defaultValue={datadb.paris} onChange={(e)=>{setCustom({...custom, paris: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="DPE moyen de 0(G) à A(6)" variant="filled" defaultValue={datadb.dpe_moyen} onChange={(e)=>{setCustom({...custom, dpe_moyen: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="taux de réussite au bac" variant="filled" defaultValue={datadb.taux_reussite_bac} onChange={(e)=>{setCustom({...custom, taux_reussite_bac: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre d'inondations" variant="filled" defaultValue={datadb['inondations.et.ou.coulées.de.boue']} onChange={(e)=>{setCustom({...custom, 'inondations.et.ou.coulées.de.boue': Number(e.target.value)})}}/>
                <br />
                <br />
                <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<EditIcon />} onClick={() =>edition()}>Override</Button>
                {mestimation !== "" && <p>Prix modélisé avec paramètres : {Intl.NumberFormat('fr-FR').format(Math.floor(mestimation*100)/100)} €</p>}
            </div>
            <div id="output" className="container">
             {datadb !== "" && (<p>Bienvenue à {datadb.nom_commune}</p>)}
             {datadb !== "" && (<p>Prix des transactions : {Intl.NumberFormat('fr-FR').format(Math.floor(datadb.prix*100)/100)} €</p>)}
             {datadb !== "" && <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<GiteIcon />} onClick={() =>lancement(input, false)}>Estimation</Button>}
             {estimation !== "" && <p>Prix modelisé : {Intl.NumberFormat('fr-FR').format(Math.floor(estimation*100)/100)} €</p>}
             </div>
        </div>
    )
}

export default Methode;

// import React from 'react';
// import "../styles/Methode.css";
// import { Container, Col, Row, Card } from 'react-bootstrap';
// import axios from 'axios';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import Plot from 'react-plotly.js';
// import { debounce } from 'lodash';

// class Methode extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//     };
//     this.onSliderChange = this.onSliderChange.bind(this);
//   }
//   async onSliderChange(input) {
//     await axios.get(`http://localhost:3002/hist-raw`,
//     {
//         params: {
//         bins: input,
//       }
//     }).then((data) => {
//       this.setState({
//         rawdata: [
//           {
//             y: data.data.map(x => x["counts"]),
//             x: data.data.map(x => x["mids"]),
//             type: 'bar'
//           }
//         ]
//       })
//     });
//   }
//   render() {
//     return (
//       <div className="methode-container">
//         <Container fluid>
//           <Row>
//             <Col md={3}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>Hello React!</Card.Title>
//                   <Card.Text>
//                     <label for="bins" class="col-form-label">
//                       Number of bins:
//                     </label>
//                     <Slider 
//                     id={"bins"} 
//                     onChange={debounce(this.onSliderChange, 60)} 
//                     min={1} 
//                     max={50} 
//                     marks={{
//                       1: '1',
//                       13: '13',
//                       26: '26',
//                       38: '38',
//                       50: '50'
//                     }} toolTipVisibleAlways={true} />
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={8}>
//               <Plot
//                 data={this.state.rawdata}
//                 layout={{
//                   title: 'Histogram of waiting times',
//                   bargap: 0.01,
//                   autosize: true,
//                   xaxis: {
//                     title: 'Waiting time to next eruption (in mins)'
//                   },
//                   yaxis: {
//                     title: 'Frequency'
//                   },
//                   useResizeHandler: true,
//                   responsive: true
//                 }}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }
// export default Methode;