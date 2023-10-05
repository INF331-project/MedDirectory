import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import { updateDoctor } from '../utils/APIRoutes';

const EditMed = ( doctor ) => {
    const location = useLocation();

    const [editedMed, setEditedMed] = useState({ ...doctor });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedMed({
        ...editedMed,
        [name]: value,
      });
    };

    //console.log({name, email, specialization, experience});
    const handleSave = async () => {
      try {
        const response = await axios.put(`${updateDoctor}/${location.state.doctor}`, editedMed);
        console.log("Datos del medico actualizados: ", response.data);
      } catch (error) {
        console.error('Error al actualizar los datos del medico: ', error);
      }
    };

    return (
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={editedMed.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="specialization"
          placeholder="Especializacion"
          value={editedMed.specialization}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experiencia"
          value={editedMed.experience}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={editedMed.email}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Guardar</button>
      </div>
    );
  };
  
  export default EditMed;