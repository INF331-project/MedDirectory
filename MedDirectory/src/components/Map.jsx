import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";
import "../styles/map.css";
// import Distance from "./Distance";
import Lugares from "./Lugares"
import Clinics from "./Clinics";

export const Map = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [office, setOffice] = useState();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setOffice({ lat: position.coords.latitude, lng: position.coords.longitude });
            // console.log("Latitude is :", position.coords.latitude);
        }), (error) => {
            console.log("Error obteniendo la locación del usuario: ", error);
        }
    }, []);
    const mapRef = useRef(null);
    // const center = useMemo(() => ({ lat: lat, lng: lng }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    return <div className="container">
        <div className="controls">
            <h2>Seleccionar Clinica</h2>
            {/* <Clinics /> */}
            <Lugares setOffice={(position) => {
                setOffice(position);
                mapRef.current.panTo(position);
            }} />
        </div>
        <div className="map">
            <GoogleMap 
            zoom={15} 
            center={{ lat: lat, lng: lng }} 
            mapContainerClassName="map-container" 
            options={options}
            onLoad={onLoad}
            >
                {office && <Marker position={office} />}
            </GoogleMap>
        </div>
    </div>;
};

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
};

export default Map;