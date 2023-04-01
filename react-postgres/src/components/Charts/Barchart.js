import React from "react";
import { Bar } from "react-chartjs-2";
import { BarController, BarElement, CategoryScale, LinearScale, Chart } from "chart.js";

export default function BarChart(props) {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(BarController);
    Chart.register(BarElement);
    return(<div>
        <Bar data={props.donnee} width={props.largeur} height={props.hauteur} options={props.options}/>
    </div>)
};