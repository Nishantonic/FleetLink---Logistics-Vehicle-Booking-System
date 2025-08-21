import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function AddVehicle() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post("/vehicles", form);
      setMessage({ type: "success", text: `✅ Vehicle ${res.data.name} added successfully!` });
      setForm({ name: "", capacityKg: "", tyres: "" });
      setTimeout(() => navigate("/vehicles"), 1500); // Navigate after 1.5s to show success message
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to add vehicle" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Add New Vehicle</h2>
          <p className="mt-2 text-sm text-gray-500">Enter vehicle details to add to your fleet</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Vehicle Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter vehicle name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="capacityKg" className="block text-sm font-medium text-gray-700">
              Capacity (kg)
            </label>
            <input
              id="capacityKg"
              type="number"
              name="capacityKg"
              placeholder="Enter capacity in kg"
              value={form.capacityKg}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="tyres" className="block text-sm font-medium text-gray-700">
              Number of Tyres
            </label>
            <input
              id="tyres"
              type="number"
              name="tyres"
              placeholder="Enter number of tyres"
              value={form.tyres}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Add Vehicle
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm font-medium text-center ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}