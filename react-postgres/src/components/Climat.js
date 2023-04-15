import React, { useEffect, useState }  from "react";
import "../styles/Climat.css";
import { ImageList,ImageListItem,ImageListItemBar } from '@mui/material';
import { styled } from '@mui/system';
import DashboardTempete from "./Dashboards/DashboardTempete";
import storm from '../img/tuile/tempete.jpg';
import flood from '../img/tuile/inondation.jpg';
import submersion from '../img/tuile/submersion.jpg';
import argile from '../img/tuile/argile.jpg';
import grele from '../img/tuile/grele.jpg';
import secheresse from '../img/tuile/secheresse.jpg';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

function Climat() {

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

    const [isShow, setShow] = useState(true);
    // const [cssClass, setCssclass] = useState("image-bar");
    // const [nbCol, setNbcol] = useState(3);
    const nbCol = 2;
    const cssClass = "image-carrousel";

    if (!isShow) {
        //setCssclass((cssClass) => "image-carrousel");
        //setNbcol((nbCol) => 6);
    }

    const itemData = [
        {
          img: flood,
          title: "Inondation",
          nom : "inondation-container",
        },
        {
            img: submersion,
            title: "Submersion",
            nom : "submersion-container",
        },
        {
            img: storm,
            title: "Tempete",
            nom : "tempete-container",
        },
        {
            img: argile,
            title: "Argile",
            nom : "argile-container"
        },
        {
            img: secheresse,
            title: "Secheresse",
            nom : "secheresse-container"
        },
        {
            img: grele,
            title: "Grele",
            nom : "grele-container"
        },
      ];
    
      function toggle() {
        // setShow((isShow) => !isShow);

      };

    return (
        <div className="climat-container">
            <div className={cssClass}>
                <ImageList  variant="masonry" cols={nbCol} rowHeight={120}>
                    {itemData.map((item) => (
                    <ImageListItemWithStyle key={item.img} sx={{ border: 1 }} onClick={toggle()}>
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
            </div>
            <div>
                <div className="detail-container">
                    <DashboardTempete />
                </div>
            </div>
        </div>
        );
    }

export default Climat;
