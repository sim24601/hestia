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
        "&:hover": {
            cursor: "pointer",
            opacity: 0.8,
            border: 'solid 1px #a0d8e7' 
        },
    }));

    const [isShow, setShow] = useState(true);

    const itemData = [
        {
          img: flood,
          title: "Inondation",
        },
        {
            img: submersion,
            title: "Submersion",
        },
        {
            img: storm,
            title: "Tempete",
        },
        {
            img: argile,
            title: "Argile",
        },
        {
            img: secheresse,
            title: "Secheresse",
        },
        {
            img: grele,
            title: "Grele",
        },
      ];
    
      function toggle() {
        setShow((isShow) => !isShow);
      };

    return (
        <div className="climat-container">
            {isShow && <div className="image-bar">
                <ImageList  variant="masonry" cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                    <ImageListItemWithStyle key={item.img} sx={{ border: 1 }} onClick={toggle}>
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
            </div>}
            {!isShow &&<div>
                <div className="detail-container">
                    <DashboardTempete />
                </div>
            </div>}
        </div>
        );
    }

export default Climat;
