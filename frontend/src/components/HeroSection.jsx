import { useEffect, useState } from "react";
import truck from "../assets/truck.jpg";
import truck2 from "../assets/truck2.jpg";
import cargoTruck from "../assets/cargoTruck.jpg";
import frontTruck from "../assets/frontTruck.jpg";
import truckload from "../assets/truckload.jpg";
import van from "../assets/van2.jpg";
import van2 from "../assets/truck.jpg";
import truckLoading from "../assets/truckLoading.jpg";
import unload from "../assets/unload.jpg";
import loading from "../assets/loading.jpg";

export default function Hero() {
  const images = [truck,cargoTruck, truckLoading, van, truckload , truck2, van2, loading, unload, frontTruck];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 w-full h-{100vh}">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Vehicle"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay for readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-500/40"></div> */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          FleetLink 🚚
        </h1>
        <p className="text-lg text-gray-100 max-w-2xl mb-6 drop-shadow">
          Book and manage vehicles effortlessly. Reliable fleet management for modern logistics.
        </p>
        <a
          href="/vehicles"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore Vehicles
        </a>
      </div>
    </section>
  );
}



