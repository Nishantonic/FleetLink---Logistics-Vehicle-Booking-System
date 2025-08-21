export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-white">🚚 FleetLink</h2>
            <p className="text-sm">Smart Vehicle Booking System</p>
          </div>

          {/* Center - Links */}
          <div className="flex space-x-6">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/searchBooking" className="hover:text-white">Search & Book</a>
            <a href="/add-vehicle" className="hover:text-white">Add Vehicle</a>
            <a href="/bookings" className="hover:text-white">Bookings</a>
            <a href="/vehicles" className="hover:text-white">Vehicles</a>
          </div>

          {/* Right side */}
          <div className="text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} FleetLink. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
