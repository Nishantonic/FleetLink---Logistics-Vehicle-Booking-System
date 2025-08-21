import request from "supertest";
import app from "../app.js"; // your Express app
import mongoose from "mongoose";
import Booking from "../models/Booking.js"; // your Booking model

describe("Booking API", () => {

  afterEach(async () => {
    // Ensure collections are cleared after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  afterAll(async () => {
    // Disconnect handled in jest.setup.js
  });

  test("should create a new booking", async () => {
    const bookingData = {
      name: "John Doe",
      date: "2025-08-25",
      slot: "10:00 AM"
    };

    const res = await request(app)
      .post("/api/bookings")
      .send(bookingData)
      .expect(201);

    expect(res.body).toMatchObject({
      name: "John Doe",
      date: "2025-08-25",
      slot: "10:00 AM"
    });

    // Check if saved in DB
    const bookingInDb = await Booking.findOne({ name: "John Doe" });
    expect(bookingInDb).not.toBeNull();
  });

  test("should get all bookings", async () => {
    // Seed a booking
    await Booking.create({ name: "Alice", date: "2025-08-26", slot: "11:00 AM" });

    const res = await request(app)
      .get("/api/bookings")
      .expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({ name: "Alice" });
  });

  test("should return 404 for non-existing booking", async () => {
    const res = await request(app)
      .get("/api/bookings/64f0f0f0f0f0f0f0f0f0f0f0") // random ObjectId
      .expect(404);

    expect(res.body.message).toBe("Booking not found");
  });
});
