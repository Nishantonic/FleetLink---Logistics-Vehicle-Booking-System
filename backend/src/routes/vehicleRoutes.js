import express from "express";
import {
  addVehicle,
  getVehicles,
  getAvailable,
  getVehiclesWithStatusCtrl,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", addVehicle); // ✅ create vehicle
router.get("/", getVehicles); // ✅ list all
router.get("/available", getAvailable); // ✅ find by query
router.get("/with-status", getVehiclesWithStatusCtrl); // ✅ list with booked/available

export default router;
