# FleetLink Backend

## Run locally
1. Copy `.env.example` to `.env` and ensure MongoDB is running locally.
2. Install deps: `npm install`
3. Start dev server: `npm run dev`

## Endpoints
- POST /api/vehicles  → { name, capacityKg, tyres }
- GET  /api/vehicles
- GET  /api/vehicles/available?capacityRequired=500&fromPincode=110001&toPincode=110020&startTime=2025-08-21T10:00:00Z
- POST /api/bookings → { vehicleId, fromPincode, toPincode, startTime, customerId }

## Notes
- Ride duration = |to - from| % 24 (hours) as per task.
- Booking overlap check ensures reliability.
