import React from "react";
import { Pie } from "react-chartjs-2";
import { PieController, ArcElement, Tooltip, Legend, Chart, Title } from "chart.js";

export default function PieChart(props) {
    Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
    return(<div>
        <Pie data={props.donnee} owidth={props.largeur} height={props.hauteur} options={props.options} />
    </div>)
};