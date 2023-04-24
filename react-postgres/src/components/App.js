import React from "react";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./Home";
import Territoire from "./Territoire";
import Climat from "./Climat";
import DetailPopulation from "./Detail/DetailPopulation";
import DetailImmobilier from "./Detail/DetailImmobilier";
import DetailRisque from "./Detail/DetailRisque";
import DetailCommune from "./Detail/DetailCommune";
import NoPage from "./NoPage";
import {  Route, Routes } from "react-router";
import { BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../store";

export default function App() {
    return (
        <div className="App">
            <div>
                <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="territoire" element={<Territoire />} >
                            <Route path=":communeCode" element={<Territoire />} />
                        </Route>
                        <Route path="climat" element={<Climat />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="population" element={<DetailPopulation />} />
                        <Route path="immobilier" element={<DetailImmobilier />} />
                        <Route path="risque" element={<DetailRisque />} />
                        <Route path="commune" element={<DetailCommune />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                </Provider>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);