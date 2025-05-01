import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Card,
} from "@mui/material";

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
        <Card
          sx={{
            maxWidth: 600,
            "&:hover": {
              boxShadow: 3,
            },
          }}
          key={booking.id}
          className="p-4 mb-4  rounded flex justify-between items-start"
        >
          {editingId === booking.id ? (
            <div className="flex flex-col gap-2 w-full">
              <TextField
                label="Customer Name"
                variant="outlined"
                name="customer_name"
                value={editForm.customer_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, customer_name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm({ ...editForm, address: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Date & Time"
                variant="outlined"
                type="datetime-local"
                name="date_time"
                value={editForm.date_time}
                onChange={(e) =>
                  setEditForm({ ...editForm, date_time: e.target.value })
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
                  value={editForm.service_type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, service_type: e.target.value })
                  }
                  label="Service Type"
                >
                  <MenuItem value="Deep Cleaning">Deep Cleaning</MenuItem>
                  <MenuItem value="Carpet Cleaning">Carpet Cleaning</MenuItem>
                  <MenuItem value="Window Cleaning">Window Cleaning</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={handleUpdate}
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
          <Box className="space-y-2 ml-4">
            <Button
              onClick={() => handleEdit(booking)}
              variant="text"
              color="primary"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(booking.id)}
              variant="text"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Card>
      ))}
    </div>
  );
};
