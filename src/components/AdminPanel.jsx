import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";

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
          <Card
            key={user.id}
            sx={{
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              {editingUserId === user.id ? (
                <div className="flex flex-col gap-2 w-full">
                  <TextField
                    label="Username"
                    value={editUserForm.username}
                    onChange={(e) =>
                      setEditUserForm({
                        ...editUserForm,
                        username: e.target.value,
                      })
                    }
                    className="p-2"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    value={editUserForm.password}
                    onChange={(e) =>
                      setEditUserForm({
                        ...editUserForm,
                        password: e.target.value,
                      })
                    }
                    className="p-2"
                    fullWidth
                    type="password"
                  />
                  <Button
                    onClick={handleUpdateUser}
                    variant="contained"
                    color="success"
                    className="mt-2"
                  >
                    Save
                  </Button>
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
            </CardContent>
            {user.role !== "admin" && (
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  onClick={() => handleEditUser(user)}
                  variant="text"
                  color="primary"
                  className="mr-3"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user.id)}
                  variant="text"
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            sx={{
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              {editingBookingId === booking.id ? (
                <div className="flex flex-col gap-2 w-full">
                  <TextField
                    name="customer_name"
                    label="Customer Name"
                    value={editBookingForm.customer_name}
                    onChange={(e) =>
                      setEditBookingForm({
                        ...editBookingForm,
                        customer_name: e.target.value,
                      })
                    }
                    className="p-2"
                    fullWidth
                  />
                  <TextField
                    name="address"
                    label="Address"
                    value={editBookingForm.address}
                    onChange={(e) =>
                      setEditBookingForm({
                        ...editBookingForm,
                        address: e.target.value,
                      })
                    }
                    className="p-2"
                    fullWidth
                  />
                  <TextField
                    label="Date & Time"
                    type="datetime-local"
                    name="date_time"
                    value={editBookingForm.date_time}
                    onChange={(e) =>
                      setEditBookingForm({
                        ...editBookingForm,
                        date_time: e.target.value,
                      })
                    }
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Service Type</InputLabel>
                    <Select
                      name="service_type"
                      value={editBookingForm.service_type}
                      onChange={(e) =>
                        setEditBookingForm({
                          ...editBookingForm,
                          service_type: e.target.value,
                        })
                      }
                      label="Service Type"
                    >
                      <MenuItem value="Deep Cleaning">Deep Cleaning</MenuItem>
                      <MenuItem value="Carpet Cleaning">
                        Carpet Cleaning
                      </MenuItem>
                      <MenuItem value="Window Cleaning">
                        Window Cleaning
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    onClick={handleUpdateBooking}
                    variant="contained"
                    color="success"
                    className="mt-2"
                  >
                    Save
                  </Button>
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
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => handleEditBooking(booking)}
                variant="text"
                color="primary"
                className="mr-3"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteBooking(booking.id)}
                variant="text"
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};
