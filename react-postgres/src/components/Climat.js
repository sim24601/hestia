import React, { useEffect, useState }  from "react";
import "../styles/Climat.css";
import { ImageList,ImageListItem,ImageListItemBar } from '@mui/material';
import { styled } from '@mui/system';
import DashboardTempete from "./Dashboards/DashboardTempete";
import DashboardGrele from "./Dashboards/DashboardGrele";
import DashboardMvt from "./Dashboards/DashboardMvt";
import DashboardInondation from "./Dashboards/DashboardInondation";
import DashboardSecheresse from "./Dashboards/DashboardSecheresse";
import DashboardSubmersion from "./Dashboards/DashboardSubmersion";
import DashboardLocalRisk from "./Dashboards/DashboardLocalRisk";
import store from "../store";
import storm from '../img/tuile/tempete.jpg';
import flood from '../img/tuile/inondation.jpg';
import submersion from '../img/tuile/submersion.jpg';
import argile from '../img/tuile/argile.jpg';
import grele from '../img/tuile/grele.jpg';
import secheresse from '../img/tuile/secheresse.jpg';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import GiteIcon from '@mui/icons-material/Gite';
import Button from '@mui/material/Button';

function Climat() {
    const datadb = store.getState().commune.properties;
    const ImageListItemWithStyle = styled(ImageListItem)(({ theme }) => ({
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
            cursor: "pointer",
            opacity: 0.8,
            border: 'solid 1px black' ,
            transform: "scale3d(1.02, 1.02, 1.02)",
        },
        "&:active": {
            opacity: 2,
            border: 'solid 1px yellow' ,
        },
    }));

    const [dash, setDash] = useState('start');
    const nbCol = 2;
    const cssClass = "image-carrousel";

    const itemData = [
        {
          img: flood,
          title: "Inondation",
          nom : "inondation",
        },
        {
            img: submersion,
            title: "Submersion",
            nom : "submersion",
        },
        {
            img: storm,
            title: "Tempete",
            nom : "tempete",
        },
        {
            img: argile,
            title: "Mouvement de Terrain",
            nom : "mvt"
        },
        {
            img: secheresse,
            title: "Secheresse",
            nom : "secheresse"
        },
        {
            img: grele,
            title: "Grele",
            nom : "grele"
        },
      ];

    // function toggle(itnom) {
    //     setDash(itnom);
    // };

    return (
        <div className="climat-container">
            <div className={cssClass}>
                <ImageList  variant="masonry" cols={nbCol} rowHeight={120}>
                    {itemData.map((item) => (
                    <ImageListItemWithStyle key={item.img} sx={{ border: 1 }} onClick={() =>setDash(item.nom)}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        className="image-list"
                    />
                    <ImageListItemBar
                        title={item.title}
                        actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.title}`}
                        >
                            <InfoIcon />
                        </IconButton>
                        }
                        />
                    </ImageListItemWithStyle>
                    ))}
                </ImageList>
                {datadb != "" && (<Button variant="contained" style={{ backgroundColor: "#00cdb1", color: "black"}} startIcon={<GiteIcon />} onClick={() =>setDash("commune")}>Ma Commune</Button>)}
            </div>
            <div>
                {dash != 'start' && (<div className="detail-container">
                    {dash == 'tempete' && (<DashboardTempete />)}
                    {dash == 'grele' && (<DashboardGrele />)}
                    {dash == 'inondation' && (<DashboardInondation />)}
                    {dash == 'secheresse' && (<DashboardSecheresse />)}
                    {dash == 'mvt' && (<DashboardMvt />)}
                    {dash == 'submersion' && (<DashboardSubmersion />)}
                    {dash == 'commune' && (<DashboardLocalRisk />)}
                </div>)}
            </div>
        </div>
        );
    }

export default Climat;
