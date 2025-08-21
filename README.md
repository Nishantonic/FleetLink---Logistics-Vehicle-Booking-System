# Fleetlink

Fleetlink is a full-stack fleet management application designed to streamline vehicle tracking, maintenance scheduling, and driver management. Built with a modern MERN stack, Fleetlink aims to provide companies with an efficient, scalable solution for managing their fleet operations in real-time.

## Features

- Add, update, and delete vehicles in the fleet  
- Track vehicle status and availability  
- Assign drivers to vehicles  
- Schedule maintenance and generate reminders  
- RESTful API for seamless integration  
- Real-time data management using MongoDB  

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Testing:** Jest, Supertest  
- **Other Tools:** MongoMemoryServer for in-memory testing, Git for version control  

## Run locally :
npm install
PORT=5000
MONGO_URI=<your-mongodb-uri>
NODE_ENV=development
npm run dev
cd frontend
npm run dev/ npm start

## Endpoints
- POST /api/vehicles  → { name, capacityKg, tyres }
- GET  /api/vehicles
- GET  /api/vehicles/available?capacityRequired=500&fromPincode=110001&toPincode=110020&startTime=2025-08-21T10:00:00Z
- POST /api/bookings → { vehicleId, fromPincode, toPincode, startTime, customerId }

## Notes
- Ride duration = |to - from| % 24 (hours) as per task.
- Booking overlap check ensures reliability.
