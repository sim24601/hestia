import React from "react";
import { Pie } from "react-chartjs-2";
import { PieController, ArcElement, Tooltip, Legend, Chart } from "chart.js";

export default function PieChart(props) {
    Chart.register(PieController, ArcElement, Tooltip, Legend);
    return(<div>
        <Pie data={props.donnee} width={props.largeur} height={props.hauteur} />
    </div>)
};