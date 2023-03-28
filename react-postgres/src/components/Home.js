import React, { Component } from "react";
import "../styles/Home.css";

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <h1>Bienvenue</h1>
                <p>Bienvenue sur le site du projet Immobilier et climat</p>
                <p>Nous vous invitons à cliquer sur le bouton territoire pour commencer votre visite.</p>
            </div>
        );
    }
}

export default Home;
