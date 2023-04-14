import React from "react";
import "../../styles/Home.css";
import carte from '../../img/carte/catnat_tem.png';
import CloseIcon from '@mui/icons-material/Close';

export default function DashboardTempete() {
    return (
        <div>
            <CloseIcon className="icon-close" fontSize="large"/>
            <ul>
                <img style={{height: 340, width: 210}}src={carte}></img>
            </ul>
        </div>
    );
}