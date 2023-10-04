import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import List from "./components/ListDoctors";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}
