import { useState, useEffect, useRef } from "react";

export default function BookingCard({ booking, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const cardRef = useRef(null);

  const statusColor = booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(booking._id);
      console.log(`Successfully deleted booking: ${booking._id}`);
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
    setDeleting(false);
  };

  

  // Close modal when clicking outside


  return (
    <>
      <div
        ref={cardRef}
        className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-500"
       
        tabIndex={0}
        role="button"
        aria-label={`View details for ${booking.vehicleId?.name || "vehicle"} booking`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {booking.vehicleId?.name || "Unknown Vehicle"}
          </h3>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}
            aria-label={`Booking status: ${booking.status || "Pending"}`}
          >
            {booking.status || "Pending"}
          </span>
        </div>
        <div className="flex items-center mb-3">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">Booking Details</span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-medium">From</span>
            <span className="font-semibold text-gray-900">{booking.fromPincode || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">To</span>
            <span className="font-semibold text-gray-900">{booking.toPincode || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Start</span>
            <span className="font-semibold text-gray-900">
              {booking.startTime ? new Date(booking.startTime).toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">End</span>
            <span className="font-semibold text-gray-900">
              {booking.endTime ? new Date(booking.endTime).toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration</span>
            <span className="font-semibold text-gray-900">
              {booking.estimatedRideDurationHours || "N/A"} hours
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Customer</span>
            <span className="font-semibold text-gray-900">{booking.customerId || "N/A"}</span>
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
              deleting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            }`}
            aria-label={`Delete booking for ${booking.vehicleId?.name || "vehicle"}`}
          >
            {deleting ? (
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
              "Delete"
            )}
          </button>
         
        </div>
      </div>

     
    
    </>
  );
}