import { useEffect, useState } from "react";
import api from "../api/axios";
import VehicleCart from "../components/VehicleCart"

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [form, setForm] = useState({
    fromPincode: "",
    toPincode: "",
    startTime: "",
    customerId: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    api.get("/vehicles/with-status").then(res => setVehicles(res.data));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings", {
        vehicleId: selectedVehicle._id,
        ...form,
      });
      alert("✅ Booking successful!");
      setSelectedVehicle(null);
      setForm({ fromPincode: "", toPincode: "", startTime: "", customerId: "" });
      loadVehicles();
      window.location.href = "/bookings";
    } catch (err) {
      alert("❌ " + err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Available Vehicles
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Choose a vehicle for your next journey
          </p>
        </header>

        {vehicles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-lg text-gray-500">No vehicles available.</p>
            <p className="mt-2 text-sm text-gray-400">
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map(v => (
              <VehicleCart
                key={v._id}
                vehicle={v}
                onSelect={() => setSelectedVehicle(v)}
              />
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {selectedVehicle && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Book {selectedVehicle.name}
              </h3>
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label htmlFor="fromPincode" className="block text-sm font-medium text-gray-700">
                    From Pincode
                  </label>
                  <input
                    id="fromPincode"
                    type="text"
                    placeholder="Enter starting pincode"
                    value={form.fromPincode}
                    onChange={(e) => setForm({ ...form, fromPincode: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    placeholder="Enter destination pincode"
                    value={form.toPincode}
                    onChange={(e) => setForm({ ...form, toPincode: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                    Customer ID
                  </label>
                  <input
                    id="customerId"
                    type="text"
                    placeholder="Enter customer ID"
                    value={form.customerId}
                    onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedVehicle(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}