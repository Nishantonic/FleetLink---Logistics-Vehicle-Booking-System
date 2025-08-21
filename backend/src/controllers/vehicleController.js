import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import { findAvailableVehicles } from "../services/bookingService.js";

/**
 * @desc Add a new vehicle
 * @route POST /api/vehicles
 */
export const addVehicle = async (req, res, next) => {
  try {
    const { name, capacityKg, tyres } = req.body;

    if (!name || !capacityKg || !tyres) {
      res.status(400);
      throw new Error("name, capacityKg, tyres are required");
    }

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get all vehicles (raw, no status)
 * @route GET /api/vehicles
 */
export const getVehicles = async (_req, res, next) => {
  try {
    const all = await Vehicle.find().lean();
    res.json(all);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Find available vehicles for a given trip (based on capacity & time)
 * @route GET /api/vehicles/available
 * @query capacityRequired, fromPincode, toPincode, startTime
 */
export const getAvailable = async (req, res, next) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      res.status(400);
      throw new Error("capacityRequired, fromPincode, toPincode, startTime are required query params");
    }

    const { vehicles, estimatedRideDurationHours } = await findAvailableVehicles({
      capacityRequired: Number(capacityRequired),
      fromPincode,
      toPincode,
      startTimeISO: startTime,
    });

    res.json({ estimatedRideDurationHours, vehicles });
  } catch (err) {
    next(err);
  }
};

export const getVehiclesWithStatusCtrl = async (_req, res, next) => {
  try {
    const vehicles = await Vehicle.find().lean();
    const now = new Date();

    const activeBookings = await Booking.find({ endTime: { $gte: now } }).select("vehicleId");
    const bookedIds = new Set(activeBookings.map(b => b.vehicleId.toString()));

    const vehiclesWithStatus = vehicles.map(v => ({
      ...v,
      status: bookedIds.has(v._id.toString()) ? "booked" : "available"
    }));

    res.json(vehiclesWithStatus);
  } catch (err) {
    next(err);
  }
};