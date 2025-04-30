import React from "react";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/auth/Login");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-gray-100 p-4 flex justify-center gap-4 shadow">
      {user?.role !== "admin" && (
        <div>
          <Link to="/" className="text-blue-600 font-semibold">
            Booking Form
          </Link>
          <Link to="/BookingList" className="text-blue-600 font-semibold">
            Manage Bookings
          </Link>
        </div>
      )}
      {user && (
        <button onClick={handleLogout} className="text-blue-600 font-semibold">
          Log out
        </button>
      )}
    </nav>
  );
};
