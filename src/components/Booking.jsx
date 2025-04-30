import { useState } from "react";
import { useNavigate } from "react-router";

export const Booking = () => {
  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service_type: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      ...form,
      date_time: new Date(form.date_time),
    };

    await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });

    setForm({
      customer_name: "",
      address: "",
      date_time: "",
      service_type: "",
    });
    navigate("/bookings");
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
