// const express = require('express');
// const router = express.Router();
// const {
//     doctorRegister,
//     doctorLogin
// } = require('../controllers/DoctorControllers'); // Usar la misma capitalización que el nombre del archivo

import { doctorRegister, doctorLogin, getAllDoctors, getDoctorbyName, UpdateDoctorbyId } from "../controllers/DoctorControllers.js";
import { Router } from "express";
const router = Router();

router.post("/doctorRegister", doctorRegister);
router.post("/doctorLogin", doctorLogin);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getDoctorbyName/:name", getDoctorbyName);
router.put("/UpdateDoctorbyId/:id", UpdateDoctorbyId);

export default router;
