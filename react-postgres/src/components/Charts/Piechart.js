import React from "react";
import { Pie } from "react-chartjs-2";
import { PieController, ArcElement, Chart } from "chart.js";

export default function PieChart(props) {
    Chart.register(PieController, ArcElement);
    return(<div>
        <Pie data={props.donnee} width={props.largeur} height={props.hauteur} />
    </div>)
};