import React from "react";
import { Bar } from "react-chartjs-2";
import { BarController, BarElement, CategoryScale, LinearScale, Chart, Title } from "chart.js";

export default function BarChart(props) {
    Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);
    return(<div>
        <Bar data={props.donnee} width={props.largeur} height={props.hauteur} options={props.options}/>
    </div>)
};