import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      title: "Fast Bookings",
      desc: "Book vehicles instantly with our seamless platform.",
      icon: (
        <svg className="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Wide Fleet",
      desc: "Choose from a range of vehicles for all your logistics needs.",
      icon: (
        <svg className="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
    {
      title: "Reliable Support",
      desc: "24/7 customer support for a hassle-free experience.",
      icon: (
        <svg className="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const vehicles = [
    {
      name: "Mini Truck",
      capacity: "800 Kg",
      icon: (
        <svg className="h-24 w-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
    {
      name: "Tempo",
      capacity: "1500 Kg",
      icon: (
        <svg className="h-24 w-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10h6m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H9zm-4 0V7" />
        </svg>
      ),
    },
    {
      name: "Heavy Truck",
      capacity: "5000 Kg",
      icon: (
        <svg className="h-24 w-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
  ];

  const handleNavigation = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSection />

      {/* Services */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 sm:text-5xl">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 text-center cursor-pointer"
              onClick={() => handleNavigation("/searchBooking")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNavigation("/searchBooking")}
              aria-label={`Learn more about ${s.title}`}
            >
              {s.icon}
              <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 sm:text-5xl">
          Featured Vehicles
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {vehicles.map((v, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 text-center cursor-pointer"
              onClick={() => handleNavigation("/vehicles")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNavigation("/vehicles")}
              aria-label={`View ${v.name} details`}
            >
              {v.icon}
              <h3 className="text-xl font-bold text-gray-900 mt-4">{v.name}</h3>
              <p className="text-gray-600 text-sm">Capacity: {v.capacity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking with Trust */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6 sm:text-5xl">Booking with Trust</h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg">
          Over 10,000+ successful bookings. Trusted by logistics companies, startups, and individuals.
          We ensure timely delivery, vehicle safety, and transparent pricing.
        </p>
        <button
          onClick={() => handleNavigation("/bookings")}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          aria-label="View my bookings"
        >
          View My Bookings
        </button>
      </section>

      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg
              className="h-6 w-6 text-white animate-[moveTruck_2s_ease-in-out_infinite]"
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
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>
        {`
          @keyframes moveTruck {
            0% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(-10px); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-in;
          }
          @keyframes slide-in {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}