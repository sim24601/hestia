import React from "react";
import { Radar } from "react-chartjs-2";
import { RadarController, LineElement, PointElement, RadialLinearScale, Chart } from "chart.js";

export default function BarChart(props) {
    Chart.register(RadarController, LineElement, PointElement, RadialLinearScale);
    return(<div>
        <Radar data={props.donnee} width={props.largeur} height={props.hauteur} options={{maintainAspectRatio: false, scaleShowLabels: false }}/>
    </div>)
};