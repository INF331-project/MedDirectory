import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllDoctorsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { deleteDoctorById } from "./DeleteDoctor";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
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
      <h2>List of Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name}, {doctor.specialization}, {doctor.experience} of
            experience.
            <button onClick={() => sendEditID(doctor._id)}>Editar</button>
            <button onClick={() => handleDeleteDoctor(doctor._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
