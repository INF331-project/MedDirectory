import { set } from "mongoose";
import React, { useState } from "react";
import { Form, Dropdown, Button, InputGroup, ListGroup } from "react-bootstrap";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

// TODO: implementar la función para buscar las clinicas más cercanas
export const Lugares = ({ setOffice }) => {
    const [clinics, setClinics] = useState([]);
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
    } = usePlacesAutocomplete();

    const fetchClinics = async () => {
        try {
            // setValue("Integramedica");
            if (status === "OK" && data.length > 0) {
                setClinics(data);
            }
            // Hacer algo con la variable clinics después de que se resuelva la promesa
            console.log(clinics);
        } catch (error) {
            // Manejar errores si ocurren
            console.error("Error al obtener las clínicas:", error);
        }
    }

    const handleSelect = async (val) => {
        const results = await getGeocode({ address: val });
        const { lat, lng } = getLatLng(results[0]);
        setOffice({ lat, lng });
    };

    const searchFirstSuggestion = () => {
        if (status === "OK" && data.length > 0) {
            const firstSuggestion = data[0].description;
            handleSelect(firstSuggestion);
            const valor = value;
            fetchClinics();
            setValue(valor);
        }
    };

    return (
        <div>
            <Form>
                <Form.Control
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Search office address"
                />
                <Button
                    variant="primary"
                    onClick={searchFirstSuggestion}
                    disabled={!ready}
                >
                    Search Address
                </Button>
            </Form>
            <ListGroup as="ul">
                {clinics.map((clinic) => (
                    <ListGroup.Item
                        as="li"
                        key={clinic.id}
                    onClick={() => handleSelect(clinic.description)}
                    >
                        {clinic.description}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Lugares;