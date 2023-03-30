import React, { Component } from "react";
import "../styles/Home.css";
import BarChart from "./Charts/Barchart";

function Climat() {
    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };

    return (
        <div className="home-container">
            <div style={{ width: 500 , height : 500 }}>
                <BarChart donnee={data}/>
            </div>
        </div>
        );
    }

export default Climat;
