import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css";
import axios from "axios";
import MapWrapper from "./Map";
import { updateCommuneCodes } from "../stores/Commune";
import { updateMapLoad } from "../stores/Map";
import DashboardCommune from "./Dashboards/DashboardCommune";
import DashboardPopulation from "./Dashboards/DashboardPopulation";
import DashboardClimat from "./Dashboards/DashboardClimat";
import DashboardImmo from "./Dashboards/DashboardImmo";
import store from "../store";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import LoupeIcon from '@mui/icons-material/Loupe';

const { api_url } = require("../settings");

function Territoire() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlParams = useParams();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ open: false, message: "" });
    const [vertical] = useState("top");
    const [horizontal] = useState("center");
    // Close the alert indicating a bad commune code in the url
    const closeAlert = () => {
        setAlert({ open: false, message: "" });
    };

    // Check the validity of the commune code in the url
    useEffect(() => {
        // Put load property to false in the Map store to avoid a problem loading of the Map component
        if (location.pathname === "/Territoire") {
            dispatch(updateMapLoad(false))
        }

        const urlParamCommuneCode = urlParams.communeCode;
        if (typeof urlParamCommuneCode !== "undefined") {
            if (urlParamCommuneCode.length !== 5) {
                setAlert({
                    open: true,
                    message:
                        "The commune code in the url must have 5 characters. \nRedirection to /dashboard",
                });
                navigate("/Territoire");
            } else {
                let url = api_url + "/api/commune/?codinsee=" + urlParamCommuneCode;
                axios
                    .get(url, {
                        params: {
                            geojson: false,
                        },
                    })
                    .then(function(response) {
                        if (response.status === 200) {
                            // Update of the current commune code
                            const responseData = response.data;
                            console.log('envoi requete', responseData[0].codinsee);
                            dispatch(
                                updateCommuneCodes({
                                    currentCode: responseData[0].codinsee,
                                    currentCompleteCode:
                                        responseData[0].codinsee,
                                    properties : responseData[0],
                                })
                            );
                        }
                    })
                    .catch(function(error) {
                        if (error.response.status === 404) {
                            setAlert({
                                open: true,
                                message:
                                    "The commune code in the url does not exist. \nRedirection to /territoire",
                            });
                            navigate("/Territoire");
                        }
                    });
            }
        }
    }, [urlParams]);

    const storeCommune = useSelector((state) => {
    return store.getState().commune;});
    const storeCommuneCurrentCode = storeCommune.currentCode;
    const visibilityContainer =
           storeCommuneCurrentCode === "" ? "hidden" : "visible";
    const opacityContainer = storeCommuneCurrentCode === "" ? "0" : "1";
    return (
        <div className="territoire-container">
            <div>
                {/* Display an error when the commune code in the url is wrong*/}
                <div>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={alert.open}
                            autoHideDuration={5000}
                            onClose={closeAlert}
                        >
                            <Alert
                                onClose={closeAlert}
                                severity="error"
                                sx={{ width: "100%" }}
                            >
                            {alert.message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                </div>
            </div>
            <div
                    id={
                        storeCommune.currentCode === ""
                            ? "map-container-full-screen"
                            : "map-container"
                    }
                    className={storeCommune.currentCode === "" ? "" : "container"}
                style={{ visibility: "visible", opacity: "1"}}
            >
                    <MapWrapper />
            </div>
                {/* API call only if there is an commune code in the store */}
                {storeCommuneCurrentCode !== "" ? (
                    <div>
                        {" "}
                        <div
                            id="commune-container"
                            className="container"
                            style={{
                                visibility: visibilityContainer,
                                opacity: opacityContainer,
                            }}
                        >
                            <div className="icon-label-container">
                                <p className="icon-container icon-commune-container"></p>
                                <Link className="lien-detail" to="/commune">
                                <p className="label-container">Commune
                                    <Button variant="text" className="bouton-detail" startIcon={<LoupeIcon style={{ color: "black" }} />}>
                                    </Button>
                                </p>
                                </Link>
                            </div>
                            <DashboardCommune />
                        </div>
                        <div
                            id="population-container"
                            className="container"
                            style={{
                                visibility: visibilityContainer,
                                opacity: opacityContainer,
                            }}
                        >
                            <div className="icon-label-container">
                                <p className="icon-container icon-population-container"></p>
                                <Link className="lien-detail" to="/population">
                                    <p className="label-container">Population
                                    <Button variant="text" className="bouton-detail" startIcon={<LoupeIcon style={{ color: "black" }} />}>
                                    </Button>
                                    </p>
                                </Link>
                            </div>
                            <DashboardPopulation />
                        </div>
                        <div
                            id="risk-container"
                            className="container"
                            style={{
                                visibility: visibilityContainer,
                                opacity: opacityContainer,
                            }}
                        >
                            <div className="icon-label-container">
                                <p className="icon-container icon-risk-container"></p>
                                <Link className="lien-detail" to="/risque">
                                    <p className="label-container">Climat
                                    <Button variant="text" className="bouton-detail" startIcon={<LoupeIcon style={{ color: "black" }} />}>
                                    </Button>
                                    </p>
                                </Link>
                            </div>
                            <DashboardClimat />
                        </div>
                        <div
                            id="immo-container"
                            className="container"
                            style={{
                                visibility: visibilityContainer,
                                opacity: opacityContainer,
                            }}
                        >
                            <div className="icon-label-container">
                                <p className="icon-container icon-immo-container"></p>
                                <Link className="lien-detail" to="/immobilier">
                                    <p className="label-container">Immobilier
                                    <Button variant="text" className="bouton-detail" startIcon={<LoupeIcon style={{ color: "black" }} />}>
                                    </Button>
                                    </p>
                                </Link>
                            </div>
                            <DashboardImmo />
                        </div>{" "}
                    </div>
                ) : (
                    ""
                )}
        </div>
    );
}

export default Territoire;