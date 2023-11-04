import React, { useState, useEffect } from "react";
import { getDistance } from "../utils/APIRoutes";
import { Dropdown } from "react-bootstrap";
import usePlacesAutocomplete from "use-places-autocomplete";
import axios from "axios";

export const Clinics = () => {
    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState([]);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const {
        value,
        setValue,
        suggestions: { status, data },
    } = usePlacesAutocomplete();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        })
    }, []);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            fetchClinics();
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
        }
    }, [lat, lng])

    const fetchClinics = async () => {
        try {
            setValue("Integramedica");
            if (status === "OK" && data.length > 0) {
                setClinics(data);
            }
        } catch (error) {
            // Manejar errores si ocurren
            console.error("Error al obtener las clínicas:", error);
        }
    };

    useEffect(() => {
        const descriptions = data.map((item) => item.description);
        setClinics(descriptions);
    }, [status, data]);

    const selectClinic = (clinic) => {
        localStorage.setItem("selectedClinic", clinic);
    };

    const filtrarClinicas = async () => {
        // TODO: quitar parte de la dirección, ej: IntegraMédica Barcelona - Barcelona, Santiago, Providencia, Chile -> Clinica Barcelona
        const lat = localStorage.getItem("lat");
        const lng = localStorage.getItem("lng");
        const response = await axios.post(
            getDistance,
            {
                "origins": [lat + "," + lng],
                "destinations": clinics,
                "travelMode": "DRIVING"
            }
        );
        const destinationAddresses = response.data.destination_addresses;
        const elements = response.data.rows[0].elements;
        const sortedValues = elements.map((element, index) => ({ index, value: element.distance.value }));
        sortedValues.sort((a, b) => a.value - b.value);
        const sortedClinics = sortedValues.map((element) => destinationAddresses[element.index]);
        setSelectedClinic(sortedClinics);
    }

    useEffect(() => {
        filtrarClinicas();
    });

    if(!clinics) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Seleccionar Clínica
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                    {selectedClinic.map((clinic) => (
                        <Dropdown.Item
                            key={clinic}
                            onClick={() => selectClinic(clinic)}
                        >
                            {clinic}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Clinics;
