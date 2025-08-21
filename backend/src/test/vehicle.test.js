import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js"
import Vehicle from "../models/Vehicle.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Vehicle.deleteMany({});
});

// POST /api/vehicles
it("should add a vehicle", async () => {
  const res = await request(app)
    .post("/api/vehicles")
    .send({ name: "Truck A", capacityKg: 2000, tyres: 6 });
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("Truck A");
});

// GET /api/vehicles/available
it("should return available vehicles (no conflicts)", async () => {
  await Vehicle.create({ name: "Truck B", capacityKg: 3000, tyres: 8 });

  const res = await request(app).get(
    "/api/vehicles/available?capacityRequired=2000&fromPincode=110001&toPincode=110010&startTime=2025-08-22T10:00:00Z"
  );

  expect(res.status).toBe(200);
  expect(res.body.vehicles.length).toBeGreaterThan(0);
});
