import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Bookings";
import Home from "./pages/Home";
// import { counter } from "./pages/counter";
function App() {
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar always at top */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SearchBooking" element={<SearchBook />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/bookings" element={<Booking />} />
          </Routes>
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
