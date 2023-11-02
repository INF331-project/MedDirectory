import { useState, useMemo, useCallback, useRef } from "react";
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

export const Map = () => {
    const [office, setOffice] = useState();
    const mapRef = useRef(null);
    const center = useMemo(() => ({ lat: -33.490823, lng: -70.618785 }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    return <div className="container">
        <div className="controls">
            <h2>Seleccionar Clinica</h2>
            <Lugares setOffice={(position) => {
                setOffice(position);
                mapRef.current?.panTo(position);
            }}/>
        </div>
        <div className="map">
            <GoogleMap 
            zoom={13} 
            center={center} 
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