import React, { useEffect, useState } from "react";

export const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editBookingForm, setEditBookingForm] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service_type: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:10000/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:10000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleDeleteBooking = async (id) => {
    await fetch(`http://localhost:10000/bookings/${id}`, { method: "DELETE" });
    fetchBookings();
  };

  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:10000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setEditUserForm({ username: user.username, password: user.password });
  };

  const handleUpdateUser = async () => {
    await fetch(`http://localhost:10000/users/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUserForm),
    });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleEditBooking = (booking) => {
    setEditingBookingId(booking.id);
    setEditBookingForm({ ...booking });
  };

  const handleUpdateBooking = async () => {
    await fetch(`http://localhost:10000/bookings/${editingBookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editBookingForm),
    });
    setEditingBookingId(null);
    fetchBookings();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 mb-2 border rounded flex justify-between items-start"
          >
            {editingUserId === user.id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={editUserForm.username}
                  onChange={(e) =>
                    setEditUserForm({
                      ...editUserForm,
                      username: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <input
                  value={editUserForm.password}
                  onChange={(e) =>
                    setEditUserForm({
                      ...editUserForm,
                      password: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <button
                  onClick={handleUpdateUser}
                  className="bg-green-600 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Password:</strong> {user.password}
                </p>
              </div>
            )}

            {user.role !== "admin" && (
              <div className="space-y-2 ml-4">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bookings Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 mb-4 border rounded flex justify-between items-start"
          >
            {editingBookingId === booking.id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  name="customer_name"
                  value={editBookingForm.customer_name}
                  onChange={(e) =>
                    setEditBookingForm({
                      ...editBookingForm,
                      customer_name: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <input
                  name="address"
                  value={editBookingForm.address}
                  onChange={(e) =>
                    setEditBookingForm({
                      ...editBookingForm,
                      address: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="datetime-local"
                  name="date_time"
                  value={editBookingForm.date_time}
                  onChange={(e) =>
                    setEditBookingForm({
                      ...editBookingForm,
                      date_time: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                />
                <select
                  name="service_type"
                  value={editBookingForm.service_type}
                  onChange={(e) =>
                    setEditBookingForm({
                      ...editBookingForm,
                      service_type: e.target.value,
                    })
                  }
                  className="p-2 border rounded"
                >
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Carpet Cleaning">Carpet Cleaning</option>
                  <option value="Window Cleaning">Window Cleaning</option>
                </select>
                <button
                  onClick={handleUpdateBooking}
                  className="bg-green-600 text-white p-2 rounded mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>{booking.customer_name}</strong>
                </p>
                <p>{booking.address}</p>
                <p>{new Date(booking.date_time).toLocaleString()}</p>
                <p>{booking.service_type}</p>
              </div>
            )}
            <div className="space-y-2 ml-4">
              <button
                onClick={() => handleEditBooking(booking)}
                className="text-blue-600 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBooking(booking.id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
