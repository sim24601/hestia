import React from "react";
import { Line } from "react-chartjs-2";
import { LineController, LineElement, PointElement, CategoryScale, LinearScale, Chart, Title, SubTitle } from "chart.js";

export default function LineChart(props) {
    Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, SubTitle);
    return(<div>
        <Line data={props.donnee} width={props.largeur} height={props.hauteur} options={props.options}/>
    </div>)
};