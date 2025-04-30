import React, { useEffect, useState } from "react";

export const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service_type: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:10000/bookings");
    const data = await res.json();

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUsername = loggedUser?.username;

    const userBookings = data.filter(
      (booking) => booking.username === loggedInUsername
    );

    setBookings(userBookings);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:10000/bookings/${id}`, { method: "DELETE" });
    fetchBookings();
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setEditForm({ ...booking });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:10000/bookings/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    fetchBookings();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-4 mb-4 border rounded flex justify-between items-start"
        >
          {editingId === booking.id ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                name="customer_name"
                value={editForm.customer_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, customer_name: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                name="address"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm({ ...editForm, address: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="date_time"
                value={editForm.date_time}
                onChange={(e) =>
                  setEditForm({ ...editForm, date_time: e.target.value })
                }
                className="p-2 border rounded"
              />
              <select
                name="service_type"
                value={editForm.service_type}
                onChange={(e) =>
                  setEditForm({ ...editForm, service_type: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Carpet Cleaning">Carpet Cleaning</option>
                <option value="Window Cleaning">Window Cleaning</option>
              </select>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white p-2 rounded mt-2"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>Customer Name:</strong> {booking.customer_name}
              </p>
              <p>
                <strong>Address:</strong> {booking.address}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(booking.date_time).toLocaleString()}
              </p>
              <p>
                <strong>Service Type:</strong> {booking.service_type}
              </p>
            </div>
          )}
          <div className="space-y-2 ml-4">
            <button
              onClick={() => handleEdit(booking)}
              className="text-blue-600 underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(booking.id)}
              className="text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
