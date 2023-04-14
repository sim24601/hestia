import React from "react";
import "../styles/Climat.css";
import { ImageList,ImageListItem,ImageListItemBar } from '@mui/material';
import storm from '../img/tuile/tempete.jpg';
import flood from '../img/tuile/inondation.jpg';
import submersion from '../img/tuile/submersion.jpg';
import argile from '../img/tuile/argile.jpg';

function Climat() {

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
      ];

    return (
        <div className="climat-container">
            <div className="image-bar">
                <ImageList variant="masonry" sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                    {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
        );
    }

export default Climat;
