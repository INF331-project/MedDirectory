import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllDoctorsRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAllDoctorsRoute);
        setDoctors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    const navigate = useNavigate();
    const sendID = (doctor) =>{
      navigate('/editmed', {state : {doctor: doctor}})
    }

  return (
    <div>
      <h2>List of Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name}, {doctor.specialization}, {doctor.experience} of
            experience.
            <button onClick={() => {sendID(doctor._id)}}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
