import { useState } from "react";

export default function VehicleCard({ vehicle, onSelect }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Use placehold.co for dynamic placeholder images
  const imageSrc = `https://placehold.co/400x300?text=${encodeURIComponent(vehicle.name)}`;
  const fallbackImage = "https://placehold.co/400x300?text=Vehicle+Image";

  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col ${
        vehicle.status === "booked"
          ? "opacity-70 cursor-not-allowed"
          : "hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {/* Image Section with Status Text Overlay */}
      <div className="relative h-48">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-t-xl"></div>
        )}
        <img
          src={imageError ? fallbackImage : imageSrc}
          alt={vehicle.name}
          className={`w-full h-48 object-cover rounded-t-xl transition-opacity duration-300 ${
            imageLoading && !imageError ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
        {/* Status Text Overlay */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
              vehicle.status === "booked"
                ? "bg-red-600/80 text-white"
                : "bg-green-600/80 text-white"
            } backdrop-blur-sm`}
            aria-label={`Vehicle status: ${vehicle.status || "Available"}`}
          >
            {vehicle.status === "booked" ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                </svg>
                Booked
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Available
              </>
            )}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 truncate">{vehicle.name}</h3>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="font-medium">Capacity</span>
            <span className="font-semibold text-gray-900">{vehicle.capacityKg} kg</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Tyres</span>
            <span className="font-semibold text-gray-900">{vehicle.tyres}</span>
          </div>
        </div>
        <button
          onClick={onSelect}
          disabled={vehicle.status === "booked"}
          className={`mt-4 w-full px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
            vehicle.status === "booked"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
          aria-label={`Select ${vehicle.name} for booking`}
        >
          {vehicle.status === "booked" ? "Unavailable" : "Select Vehicle"}
        </button>
      </div>
    </div>
  );
}