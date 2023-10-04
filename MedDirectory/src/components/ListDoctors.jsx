import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllDoctorsRoute } from "../utils/APIRoutes";

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

  return (
    <div>
      <h2>List of Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            {doctor.name}, {doctor.specialization}, {doctor.experience} of
            experience.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
