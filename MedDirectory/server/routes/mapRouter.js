import { getDistance } from "../controllers/MapController.js";  
import { Router } from "express";
const router = Router();

router.post("/getDistance", getDistance)

export default router;