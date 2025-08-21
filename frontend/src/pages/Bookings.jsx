import { useEffect, useState } from "react";
import api from "../api/axios";
import BookingCard from "../components/BookingCart";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then(res => setBookings(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Your Bookings
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Manage your vehicle bookings with ease
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-lg text-gray-500">No bookings found.</p>
            <p className="mt-2 text-sm text-gray-400">
              Book a vehicle to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map(b => (
              <BookingCard key={b._id} booking={b} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}