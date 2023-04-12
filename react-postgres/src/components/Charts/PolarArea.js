import React from "react";
import { PolarArea } from "react-chartjs-2";
import { PolarAreaController, ArcElement, RadialLinearScale, Chart } from "chart.js";

export default function Polar(props) {
    Chart.register(PolarAreaController, ArcElement, RadialLinearScale);
    return(<div>
        <PolarArea data={props.donnee} width={props.largeur} height={props.hauteur} options={props.options} />
    </div>)
};