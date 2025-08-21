import express from "express";
import { createBooking, listBookings, getBookingById,deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:id", getBookingById)
router.post("/", createBooking);
router.get("/", listBookings);
router.delete("/:id", deleteBooking);

export default router;