import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import Clinics from "./Clinics";

// TODO: implementar la función para buscar las clinicas más cercanas
export const Lugares = ({ setOffice }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
    } = usePlacesAutocomplete();

    const handleSelect = async (val) => {
        const results = await getGeocode({ address: val });
        const { lat, lng } = getLatLng(results[0]);
        setOffice({ lat, lng });
    };

    const searchFirstSuggestion = () => {
        if (status === "OK" && data.length > 0) {
            const firstSuggestion = data[0].description;
            handleSelect(firstSuggestion);
        }
    };

    return (
        <Form>
            <Form.Control
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="ingrese dirección"
            />
            <Button
                variant="primary"
                onClick={searchFirstSuggestion}
                disabled={!ready}
            >
                Buscar Dirección
            </Button>
        </Form>
    );
};

export default Lugares;