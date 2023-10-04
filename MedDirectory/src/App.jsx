import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import EditMed from "./components/EditMed";
import List from "./components/ListDoctors";

export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editmed" element={<EditMed />} />
        <Route path="/list" element={<List />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}