import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VehicleCard from "../components/VehicleCart"; 

export default function SearchBook() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: null,
    customerId: "",
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });

    if (name === "startTime") {
      const selectedDate = value;
      const now = new Date();
      if (selectedDate && selectedDate < now) {
        setDateError("Start time cannot be in the past");
      } else {
        setDateError(null);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (dateError || !form.startTime) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get("/vehicles/available", {
        params: { ...form, startTime: form.startTime.toISOString() },
      });
      // Filter out booked vehicles
      const availableVehicles = res.data.vehicles.filter(v => v.status !== "booked");
      setResults(availableVehicles);
      setMessage({ type: "info", text: `Found ${availableVehicles.length} vehicles` });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to search vehicles" });
    }
    setLoading(false);
  };

  const handleBook = async (vehicleId, vehicleName) => {
    setMessage(null);
    try {
      const res = await axios.post("/bookings", {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime.toISOString(),
        customerId: form.customerId,
      });
      setMessage({ type: "success", text: `✅ Booking created for ${res.data.vehicleId.name}` });
      setTimeout(() => navigate("/bookings"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Booking failed" });
    }
  };

  // Get current date for minDate
  const minDate = new Date();
  // Set minTime for today to prevent past times
  const minTime = new Date();
  minTime.setHours(minDate.getHours(), minDate.getMinutes(), 0, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Search & Book Vehicles
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Find the perfect vehicle for your journey
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label htmlFor="capacityRequired" className="block text-sm font-medium text-gray-700">
                Capacity Required (kg)
              </label>
              <input
                id="capacityRequired"
                type="number"
                name="capacityRequired"
                placeholder="Enter capacity in kg"
                value={form.capacityRequired}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                min="0"
                required
              />
            </div>
            <div>
              <label htmlFor="fromPincode" className="block text-sm font-medium text-gray-700">
                From Pincode
              </label>
              <input
                id="fromPincode"
                type="text"
                name="fromPincode"
                placeholder="Enter starting pincode"
                value={form.fromPincode}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="toPincode" className="block text-sm font-medium text-gray-700">
                To Pincode
              </label>
              <input
                id="toPincode"
                type="text"
                name="toPincode"
                placeholder="Enter destination pincode"
                value={form.toPincode}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <DatePicker
                id="startTime"
                selected={form.startTime}
                onChange={(date) => handleChange("startTime", date)}
                showTimeSelect
                timeIntervals={5}
                minDate={minDate}
                minTime={form.startTime && form.startTime.toDateString() === minDate.toDateString() ? minTime : undefined}
                maxTime={form.startTime && form.startTime.toDateString() === minDate.toDateString() ? new Date(23, 59, 59) : undefined}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select start date and time"
                className={`mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                  dateError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                required
                aria-describedby={dateError ? "startTime-error" : undefined}
              />
              {dateError && (
                <p id="startTime-error" className="mt-1 text-sm text-red-600">
                  {dateError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                Customer ID
              </label>
              <input
                id="customerId"
                type="text"
                name="customerId"
                placeholder="Enter customer ID"
                value={form.customerId}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || dateError || !form.startTime}
              className={`w-full px-4 py-3 rounded-lg text-white font-medium transition duration-200 ${
                loading || dateError || !form.startTime
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg
                    className="h-5 w-5 text-white animate-[moveTruck_2s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </span>
              ) : (
                "Search Availability"
              )}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm font-medium text-center ${
                message.type === "success"
                  ? "text-green-600"
                  : message.type === "error"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        {results.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((v) => (
              <VehicleCard
                key={v._id}
                vehicle={v}
                onSelect={() => handleBook(v._id, v.name)}
              />
            ))}
          </div>
        )}
        {results.length === 0 && !loading && message?.type !== "error" && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-lg text-gray-500">No vehicles found.</p>
            <p className="mt-2 text-sm text-gray-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* CSS for truck animation and datepicker styling */}
      <style>
        {`
          @keyframes moveTruck {
            0% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(-10px); }
          }
          .react-datepicker-wrapper {
            width: 100%;
          }
          .react-datepicker {
            font-family: 'Inter', sans-serif;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .react-datepicker__header {
            background-color: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
          }
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected,
          .react-datepicker__time-list-item--selected {
            background-color: #2563eb !important;
            color: white !important;
          }
          .react-datepicker__day--disabled {
            color: #d1d5db !important;
            cursor: not-allowed;
          }
          .react-datepicker__time-list-item {
            padding: 0.5rem !important;
          }
        `}
      </style>
    </div>
  );
}