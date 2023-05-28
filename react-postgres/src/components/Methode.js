import React, { useState, useCallback }  from "react";
import "../styles/Methode.css";
import store from "../store";
import GiteIcon from '@mui/icons-material/Gite';
import Button from '@mui/material/Button';
import axios from "axios";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from "@mui/material/Snackbar";
const { api_url2 } = require("../settings");

function Methode() {
    const datadb = store.getState().commune.properties;
    const url = api_url2 + "/getprediction";
    const [estimation, setEstimation] = useState('');
    const [mestimation, setMestimation] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { geom, geom_commune, ...input} = datadb
    const [custom, setCustom] = useState(input);

    async function estimate(arg1, arg2) {
        console.log('SUCCESS 0 : ', arg1, ' sending ', isSending)
        await axios.get(url, {
                    params: {
                    bins: JSON.stringify(arg1),
                  }
        })
        .then(function(response) {
            if (response.status === 200) {
                setIsSending(false);
                console.log('status OK à ',arg2, " sending ", isSending)
                let close = response.data[0][".pred"];
                if (!arg2) {
                    setEstimation(close);
                }
                if (arg2) {
                    setMestimation(close);
                }
                
            }
        })
        .catch(function(error) {
            setIsSending(false);
            console.log('alerte générale', error);
        });
    };

    function edition() {
        const alpha = true;
        console.log('status à ',alpha);
        lancement(custom, alpha);
    }

    const lancement = useCallback(async (entree, alpha) => {
        setIsSending(true);
        async function fetch(arg1, alpha) {
            await estimate(arg1, alpha);
        }
        fetch(entree, alpha);
    }, [isSending])

    return (
        <div className="methode-container">
            <div id="input" className="container">
                <p>Modifiez les paramètres pour obtenir un prix ajusté :</p>
                <TextField id="filled-basic" label="nombre de logements" variant="filled" defaultValue={datadb.nb_log} onChange={(e)=>{setCustom({...custom, nb_log: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="population" variant="filled" defaultValue={datadb.population} onChange={(e)=>{setCustom({...custom, population: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="revenu median en €" variant="filled" defaultValue={datadb.revenu_median} onChange={(e)=>{setCustom({...custom, revenu_median: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="loyer moyen en €/m2" variant="filled" defaultValue={Math.floor(datadb.loyer_apt*100)/100} onChange={(e)=>{setCustom({...custom, loyer_apt: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="cumul de vues wiki" variant="filled" defaultValue={datadb.vues} onChange={(e)=>{setCustom({...custom, vues: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de cambriolages" variant="filled" defaultValue={datadb.cambriolages} onChange={(e)=>{setCustom({...custom, cambriolages: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de permis de construire" variant="filled" defaultValue={datadb.dempc} onChange={(e)=>{setCustom({...custom, dempc: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de commerces" variant="filled" defaultValue={datadb.commerces} onChange={(e)=>{setCustom({...custom, commerces: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="Risque d'argile de 1 à 3" variant="filled" defaultValue={datadb.argile} onChange={(e)=>{setCustom({...custom, argile: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="température mediane" variant="filled" defaultValue={datadb.temperature_mediane} onChange={(e)=>{setCustom({...custom, temperature_mediane: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre de voyageurs en train" variant="filled" defaultValue={datadb.nb_voyageurs_train} onChange={(e)=>{setCustom({...custom, nb_voyageurs_train: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="équipements de santé" variant="filled" defaultValue={datadb.sante} onChange={(e)=>{setCustom({...custom, sante: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="temps de trajet à Paris" variant="filled" defaultValue={datadb.paris} onChange={(e)=>{setCustom({...custom, paris: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="DPE moyen de 0 à 6 (de G à A)" variant="filled" defaultValue={Math.floor(datadb.dpe_moyen*100)/100} onChange={(e)=>{setCustom({...custom, dpe_moyen: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="taux de réussite au bac" variant="filled" defaultValue={Math.floor(datadb.taux_reussite_bac*100)/100} onChange={(e)=>{setCustom({...custom, taux_reussite_bac: Number(e.target.value)})}}/>
                <TextField id="filled-basic" label="nombre d'inondations" variant="filled" defaultValue={datadb['inondations.et.ou.coulées.de.boue']} onChange={(e)=>{setCustom({...custom, 'inondations.et.ou.coulées.de.boue': Number(e.target.value)})}}/>
                <br />
                <br />
                <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black", padding: "2"}} startIcon={<EditIcon />} onClick={() =>edition()}>Ajuster</Button>  <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<EditIcon />} onClick={() =>setCustom(input)}>Reinitialiser</Button>
                {mestimation !== "" && <p>Prix modélisé avec paramètres : {Intl.NumberFormat('fr-FR').format(Math.floor(mestimation*100)/100)} €</p>}
            </div>
            <div id="output" className="container">
             {datadb !== "" && (<p>Bienvenue à {datadb.nom_commune}</p>)}
             {datadb !== "" && (<p>Prix du m2 : {Intl.NumberFormat('fr-FR').format(Math.floor(datadb.prix*100)/100)} €</p>)}
             {datadb !== "" && (<p>Cliquez ci-dessous pour obtenir le prix estimé par le modèle</p>)}
             {datadb !== "" && <Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<GiteIcon />} onClick={() =>lancement(input, false)}>Modéliser</Button>}
             {estimation !== "" && <p>Prix modelisé : {Intl.NumberFormat('fr-FR').format(Math.floor(estimation*100)/100)} €</p>}
             {isSending && (<p> <CircularProgress color="secondary" /></p>)}
            </div>
        </div>
    )
}

export default Methode;