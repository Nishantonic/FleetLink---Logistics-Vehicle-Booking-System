import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import { calculateRideDuration, isVehicleAvailable } from "../services/bookingService.js";

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    // Handle invalid ObjectId or server errors
    res.status(500).json({ message: error.message });
  }
};

export const listBookings = async (_req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("vehicleId", "name capacityKg tyres")
      .lean();

    // Enrich with estimated duration
    const enriched = bookings.map(b => {
      const estimatedRideDurationHours = calculateRideDuration(
        b.fromPincode,
        b.toPincode
      );
      return { ...b, estimatedRideDurationHours };
    });

    res.json(enriched);
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      res.status(400);
      throw new Error("vehicleId, fromPincode, toPincode, startTime, customerId are required");
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      res.status(400);
      throw new Error("Invalid vehicleId format");
    }

    // Calculate duration
    const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    // Re-check availability
    const available = await isVehicleAvailable(vehicleId, start, end);
    if (!available) {
      res.status(409);
      throw new Error("Vehicle already booked for this time window");
    }

    // Create booking
    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json({
      booking,
      estimatedRideDurationHours,
      endTime: end,
    });
  } catch (err) {
    next(err);
  }
};



export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid booking id format");
    }

    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.json({ message: "Booking deleted", booking });
  } catch (err) {
    next(err);
  }
};