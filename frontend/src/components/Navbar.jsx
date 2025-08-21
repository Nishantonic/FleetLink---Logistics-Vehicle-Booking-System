import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
      isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-700 hover:text-white"
    }`;

  const handleNavigation = (path) => {
    setIsNavigating(true);
    setIsOpen(false);
    setIsProfileOpen(false);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 500); // Simulate navigation delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsProfileOpen(false);
    }
  };

  // Close mobile/profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-white flex items-center gap-2"
              onClick={() => handleNavigation("/")}
            >
              <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              FleetLink
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/searchBooking"
              className={linkClasses}
              onClick={() => handleNavigation("/searchBooking")}
            >
              Search & Book
            </NavLink>
            <NavLink
              to="/add-vehicle"
              className={linkClasses}
              onClick={() => handleNavigation("/add-vehicle")}
            >
              Add Vehicle
            </NavLink>
            <NavLink
              to="/bookings"
              className={linkClasses}
              onClick={() => handleNavigation("/bookings")}
            >
              Bookings
            </NavLink>
            <NavLink
              to="/vehicles"
              className={linkClasses}
              onClick={() => handleNavigation("/vehicles")}
            >
              Vehicles
            </NavLink>
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
                aria-label="User profile menu"
                aria-expanded={isProfileOpen}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Profile</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button
                    onClick={() => {
                      console.log("Logging out");
                      handleNavigation("/logout"); // Replace with actual logout logic
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    aria-label="Log out"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-lg"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden px-4 pb-4 pt-2 bg-gray-800 animate-slide-in"
        >
          <NavLink
            to="/searchBooking"
            className={linkClasses}
            onClick={() => handleNavigation("/searchBooking")}
          >
            Search & Book
          </NavLink>
          <NavLink
            to="/add-vehicle"
            className={linkClasses}
            onClick={() => handleNavigation("/add-vehicle")}
          >
            Add Vehicle
          </NavLink>
          <NavLink
            to="/bookings"
            className={linkClasses}
            onClick={() => handleNavigation("/bookings")}
          >
            Bookings
          </NavLink>
          <NavLink
            to="/vehicles"
            className={linkClasses}
            onClick={() => handleNavigation("/vehicles")}
          >
            Vehicles
          </NavLink>
          <button
            onClick={() => {
              console.log("Logging out from mobile menu");
              handleNavigation("/logout"); // Replace with actual logout logic
            }}
            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white rounded-lg"
            aria-label="Log out"
          >
            Log Out
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
          @keyframes slide-in {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </nav>
  );
}