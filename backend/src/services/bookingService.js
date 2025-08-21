import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";

export const calculateRideDuration = (fromPincode, toPincode) => {
  const a = Math.abs(parseInt(toPincode, 10) - parseInt(fromPincode, 10));
  return a % 24;
};

export const isVehicleAvailable = async (vehicleId, startTime, endTime) => {
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) return false;
  const conflict = await Booking.exists({
    vehicleId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });
  return !conflict;
};

export const findAvailableVehicles = async ({ capacityRequired, fromPincode, toPincode, startTimeISO }) => {
  const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
  const start = new Date(startTimeISO);
  const end = new Date(start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

  const candidates = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } })
    .select("name capacityKg tyres")
    .lean();

  if (candidates.length === 0) return { vehicles: [], estimatedRideDurationHours };

  const candidateIds = candidates.map(v => v._id);

  const busy = await Booking.distinct("vehicleId", {
    vehicleId: { $in: candidateIds },
    startTime: { $lt: end },
    endTime: { $gt: start },
  });

  const busySet = new Set(busy.map(id => id.toString()));

  const available = candidates
    .filter(v => !busySet.has(v._id.toString()))
    .map(v => ({ ...v, estimatedRideDurationHours }));

  return { vehicles: available, estimatedRideDurationHours };
};

export const getVehiclesWithStatus = async () => {
  // Get all vehicles
  const vehicles = await Vehicle.find().lean();

  // Find all active bookings (current time falls between start & end)
  const now = new Date();
  const activeBookings = await Booking.find({
    startTime: { $lt: now },
    endTime: { $gt: now },
  }).select("vehicleId");

  const bookedIds = new Set(activeBookings.map(b => b.vehicleId.toString()));

  // Attach status to each vehicle
  return vehicles.map(v => ({
    ...v,
    status: bookedIds.has(v._id.toString()) ? "booked" : "available",
  }));
};