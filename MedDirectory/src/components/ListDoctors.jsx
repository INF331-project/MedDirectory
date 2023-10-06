import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllDoctorsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { deleteDoctorById } from "./DeleteDoctor";
import Home from './Home';
import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [foundMed, setFoundMed] = useState(doctors);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results =  doctors.filter((doctor) => {
        return doctor.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundMed(results);
    } else {
      setFoundMed(doctors);
    }
    setName(keyword);
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(getAllDoctorsRoute);
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendEditID = (doctor_id) => {
    navigate("/editmed", { state: { doctor: doctor_id } });
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await deleteDoctorById(doctorId);
      fetchData();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div>
      <Home />
      <h2>List of Doctors</h2>
      <input 
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="nombre"
      />
      <ListGroup as="ul">
        {foundMed && foundMed.length > 0 ? (
          foundMed.map((doctor) => (
            <ListGroup.Item as="li"key={doctor._id}>
              {doctor.name}, {doctor.specialization}, {doctor.experience} of
              experience.
              <Button onClick={() => sendEditID(doctor._id)}>Editar</Button>
              <Button variant='primary' onClick={() => handleDeleteDoctor(doctor._id)}>Borrar</Button>
            </ListGroup.Item>
          ))
        ) : (
          <div>
            <a>No se encuentran resultados</a>
          </div>
        )}
      </ListGroup>
    </div>
  );
  
}

export default DoctorList;
