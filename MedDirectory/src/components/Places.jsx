import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

export const Places = ({ setOffice }) => {
    const [value, setValue] = useState("");
    const {
        ready,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setOffice({ lat, lng });
    };

    return (
        <Form>
            <InputGroup>
                <Form.Control
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Search office address"
                />
                <InputGroup.Append>
                    <InputGroup.Text onClick={() => handleSelect(value)}>
                        Search
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            {status === "OK" && (
                <ul>
                    {data.map(({ place_id, description }) => (
                        <li key={place_id} onClick={() => handleSelect(description)}>
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </Form>
    );
};

export default Places;