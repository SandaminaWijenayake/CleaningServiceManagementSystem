import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Booking = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service_type: "",
  });

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const username = loggedUser?.username;
  console.log(username);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("No user is logged in!");
      return;
    }

    const newBooking = {
      ...form,
      date_time: new Date(form.date_time),
      customer_name: form.customer_name,
      username: username,
    };

    try {
      const response = await axios.post(
        "http://localhost:10000/bookings",
        newBooking
      );

      if (response.status === 201) {
        console.log("Booking successfully added:", response.data);
      }

      setForm({
        customer_name: "",
        address: "",
        date_time: "",
        service_type: "",
      });

      navigate("/BookingList");
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Book a Cleaning Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          placeholder="Customer Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="date_time"
          value={form.date_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="service_type"
          value={form.service_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Service Type</option>
          <option value="Deep Cleaning">Deep Cleaning</option>
          <option value="Carpet Cleaning">Carpet Cleaning</option>
          <option value="Window Cleaning">Window Cleaning</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};
