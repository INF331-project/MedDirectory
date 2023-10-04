import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { getAllDoctorsRoute } from '../utils/APIRoutes';

const EditMed = ({ doctor, onSave }) => {
    const [editedMed, setEditedMed] = useState({ ...doctor });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedMed({
        ...editedMed,
        [name]: value,
      });
    };
  
    const handleSave = () => {
      // Realizar una solicitud PUT para actualizar el usuario en la base de datos
      axios.put(`${getAllDoctorsRoute}?id=${doctor}`, editedMed)
        .then((response) => {
          onSave(response.data); // Llama a la función onSave con los datos actualizados
        })
        .catch((error) => {
          console.error('Error al actualizar usuario:', error);
        });
    };
  
    return (
      <div>
        <input
          type="text"
          name="name"
          value={editedMed.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="especialización"
          value={editedMed.specialization}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experiencia"
          value={editedMed.experience}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Guardar</button>
      </div>
    );
  };
  
  export default EditMed;