import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './components/Home';
import EditMed from "./components/EditMed";
import List from "./components/ListDoctors";
import AddDoctor from "./components/AddDoctor";

export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editmed" element={<EditMed />} />
        <Route path="/list" element={<List />} />
        <Route path="/addDoctor" element={<AddDoctor />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}