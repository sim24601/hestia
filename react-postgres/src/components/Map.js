import React, { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import {api_url, config} from "../settings";
import L, { MapContainer, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geocoder-ban/dist/leaflet-geocoder-ban.min.css";
import "leaflet-geocoder-ban/dist/leaflet-geocoder-ban.js";
import store from "../store";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateMapCenter, updateMapZoom } from "../stores/Map";
import { commune, updateCommuneCodes } from "../stores/Commune";
import { withResizeDetector } from "react-resize-detector";
import * as turf from "@turf/turf";
import { useNavigate } from "react-router-dom";

function MapWrapper() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeCommune = useSelector((_state) => store.getState().commune);
    const completeCodeCommune = storeCommune.currentCompleteCode;
    const [mapLoad, changeMapLoad] = useState(false);

    const storeMap = useSelector((_state) => store.getState().map);

    const [mapZoom, changeMapZoom] = useState(storeMap.zoom);
    const [mapCenter, changeMapCenter] = useState(storeMap.center);
    let mapRef = useRef(null);
    let width = "100%";

    const tileLayerOsm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );

    const leafIcon = L.Icon.extend({
        options: {
            iconSize: [20, 20],
            iconAnchor: [5, 30],
            popupAnchor: [25, -25],
        },
    });

    const iconGeocoderMarker = new leafIcon({
        iconUrl: require("../img/geohome.png"),
    });
    const iconTransaction = new leafIcon({
        iconUrl: require("../img/flag.png"),
    });
    let geocoderMarkerLayer = "";
    let communeLayer = "";
    const geocoder = L.geocoderBAN({
        placeholder: "Rechercher une adresse",
        resultsNumber: 5,
        collapsed: false,
        style: "searchBar",
    });
    geocoder.markGeocode = function(feature) {
        retrieveGeocodingResult(feature);
    };

    useEffect(() => {
        if (completeCodeCommune !== "") {
            addCommuneLayer("");
        }
    }, [completeCodeCommune]);


    useEffect(() => {
    if (mapLoad === false) {
        mapRef.current = L.map('map');
        tileLayerOsm.addTo(mapRef.current);
        geocoder.addTo(mapRef.current);
        mapRef.current.zoomControl.setPosition("bottomleft");
        updateMapView();
        changeMapLoad(true);
        }
    // Update of the map view when an address has been geocoded
        else {
            updateMapView();
        }
    mapRef.current.invalidateSize();
    }, [width, mapCenter]);

    const updateMapView = () => {
        if (storeMap.load === false) {
            mapRef.current.setView(mapCenter, mapZoom);
        }
        // Map is already loaded
        else {
            mapRef.current.flyTo(mapCenter, mapZoom, {
                animate: true,
                duration: 1,
            });
        }
    };

    // Retrieve the geocoding result
    const retrieveGeocodingResult = (feature) => {
        const latitudeGeocoderCoordinate = feature.geometry.coordinates[1];
        const longitudeGeocoderCoordinate = feature.geometry.coordinates[0];
        let geocoderCoordinates = [
            latitudeGeocoderCoordinate,
            longitudeGeocoderCoordinate,
        ];

        // Change the geocoder current text
        document.querySelector(
            ".leaflet-control-geocoder-ban-form input"
        ).value = feature.properties.label;

        // Add layers
        removeAllLayers();
        addGeocoderMarkerLayer(geocoderCoordinates);
        addCommuneLayer(geocoderCoordinates);
    };

    // Add the geocoder marker layer
    const addGeocoderMarkerLayer = (geocoderCoordinates) => {
        geocoderMarkerLayer = L.marker(geocoderCoordinates, {
            icon: iconGeocoderMarker,
        });
        geocoderMarkerLayer.addTo(mapRef.current);

        let urlgeo = api_url + "/api/closest/";
        let urlgeoParams = {
            lat: geocoderCoordinates[0],
            lon: geocoderCoordinates[1],
        };
        console.log('appel geo');
        axios.get(urlgeo, {
                params: urlgeoParams,
            })
            .then(function(response) {
                let arrData = response.data
                arrData.forEach(function(element) {
                let transacdata = element;
                let transaccoord = [transacdata.lat, transacdata.lon];
                let transacMarkerLayer = L.marker(transaccoord, {
                    icon: iconTransaction,
                });
                transacMarkerLayer.addTo(mapRef.current);
                let popuptransaction = `<div class="commune-popup-container">
                    <div class="commune-popup-line"> 
                      <span class="commune-popup-title">Annee de mutation: </span> 
                      <span>${transacdata.annee_mutation}</span>
                    </div>     
                    <div class="commune-popup-line"> 
                      <span class="commune-popup-title">Prix Brut en euros: </span> 
                      <span>${transacdata.prix_brut}</span>
                    </div>
                    <div class="commune-popup-line"> 
                      <span class="commune-popup-title">Taille du bati en m2 : </span> 
                      <span>${transacdata.taille_bati}</span>     
                    </div>
                    <div class="commune-popup-line"> 
                      <span class="commune-popup-title">Taille du terrain en m2 : </span> 
                      <span>${transacdata.taille_terrain}</span>     
                    </div>
                    </div>`;
                    transacMarkerLayer
                        .bindPopup(popuptransaction, { offset: [100, 80] })
                        .on("mouseover", function(e) {
                            this.openPopup();
                        })
                        .on("mouseout", function(e) {
                            this.closePopup();
                        });
                    })
            })
            .catch(function(error){
                    console.log(error);
            });
        }

    // Remove geocoder and commune layers
    const removeAllLayers = () => {
        mapRef.current.eachLayer(function (layer) {
            let urlLayer = layer._url;
            if (!urlLayer) {
                mapRef.current.removeLayer(layer);
            }
        });
    }

    // Retrieve commune coordinates associated with the geocoded adress or the commune entered in the url
    // Add commune layer
    const addCommuneLayer = (geocoderCoordinates) => {
        let urlApi = "";
        let urlApiParams = {};
        // Geocoded adress
        if (geocoderCoordinates !== "") {
            urlApi = api_url + "/api/geocode/";
            urlApiParams = {
                lat: geocoderCoordinates[0],
                lon: geocoderCoordinates[1],
            };
        }
        // Commune entered in the url
        else {
            urlApi = api_url + "/api/commune/" + completeCodeCommune;
            urlApiParams = {
                geojson: true,
            };
            console.log("test de renvoi", urlApi)
            navigate("/territoire/" + completeCodeCommune);
        }
        console.log("envoyez la req sur ", urlApi, " avec ", urlApiParams);
        axios
            .get(urlApi, {
                params: urlApiParams,
            })
            .then(function(response) {
                if (response.status === 200) {
                    let dt = JSON.parse(response.data[0].geom);
                    const feature = turf.multiPolygon(dt["coordinates"]);
                    const featureProperties = response.data[0];
                    // Update the center and zoom values of the map in the store -> useEffect function
                    let centroid = turf.center(feature);
                    let centroidCoordinates = [
                        centroid.geometry.coordinates[1],
                        centroid.geometry.coordinates[0],
                    ];
                    dispatch(updateMapZoom(12));
                    dispatch(updateMapCenter(centroidCoordinates));
                    changeMapZoom(12);
                    changeMapCenter(centroidCoordinates);

                    let styleCommuneLayer = {
                        color: "#00cdb1",
                        weight: 4,
                        opacity: 0.6,
                    };
                    communeLayer = L.geoJSON(feature, {
                        style: styleCommuneLayer,
                    });
                    communeLayer.addTo(mapRef.current);

                    // Update of the current commune code -> update the width of the map and the dashboard
                    dispatch(
                        updateCommuneCodes({
                            currentCode: featureProperties.codinsee,
                            currentCompleteCode:
                                featureProperties.codinsee,
                            properties : featureProperties,
                        })
                    );
                }
                else {
                    console.log("req en echec");
                }
            });
    };

    return (
        <div className="map-container">
            <div
                id="map"
                ref={mapRef}
                height={"100%"}>
            </div>
        </div>
    );
}

export default withResizeDetector(MapWrapper);