import React from "react";
import "../../styles/Home.css";
import carte from '../../img/carte/catnat_gre.png';
import CloseIcon from '@mui/icons-material/Close';

export default function DashboardGrele() {
    return (
        <div>
            <CloseIcon className="icon-close" fontSize="large"/>
            <ul>
                <img style={{height: "90%", width: "50%", left:2, position: "absolute"}}src={carte}></img>
            </ul>
        </div>
    );
}