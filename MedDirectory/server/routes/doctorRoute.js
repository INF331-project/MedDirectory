// const express = require('express');
// const router = express.Router();
// const {
//     doctorRegister,
//     doctorLogin
// } = require('../controllers/DoctorControllers'); // Usar la misma capitalización que el nombre del archivo

import { doctorRegister, doctorLogin } from "../controllers/DoctorControllers.js";
import { Router } from "express";
const router = Router();

router.post("/doctorRegister", doctorRegister);
router.post("/doctorLogin", doctorLogin);

export default router;
