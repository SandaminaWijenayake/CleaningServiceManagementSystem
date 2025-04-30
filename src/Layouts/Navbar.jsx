import React from "react";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 flex justify-center gap-4 shadow">
      <Link to="/" className="text-blue-600 font-semibold">
        Booking Form
      </Link>
      <Link to="/BookingList" className="text-blue-600 font-semibold">
        Manage Bookings
      </Link>
    </nav>
  );
};
