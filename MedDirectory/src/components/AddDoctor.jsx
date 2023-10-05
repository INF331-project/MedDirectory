import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Email validation (simple pattern, you can improve it)
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation (minimum length, you can add more rules)
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Name validation (not empty)
    if (!formData.name.trim()) {
        errors.name = "Name is required";
        console.log("Name is required")
    }

    // Specialization validation (not empty)
    if (!formData.specialization.trim()) {
        errors.specialization = "Specialization is required";
        console.log("Specialization is required")
    }

    // Experience validation (not empty)
    if (!formData.experience.trim()) {
        errors.experience = "Experience is required";
        console.log("Experience is required")
    }

    setErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/doctorAPI/doctorRegister",
          formData
        );

        console.log("Doctor registration successful:", response.data);
        // Handle successful registration (e.g., show a success message)

        // Redirect to listing page
        navigateTo('/list');
      } catch (error) {
        console.error("Error registering doctor:", error);
        // Handle registration error (e.g., show an error message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="experience">Experience:</label>
        <input
          type="text"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register Doctor</button>
    </form>
  );
}

export default AddDoctor;
