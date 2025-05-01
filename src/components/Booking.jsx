import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";

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
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Book a Cleaning Service
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Customer Name"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Date & Time"
            type="datetime-local"
            name="date_time"
            value={form.date_time}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Service Type"
            name="service_type"
            value={form.service_type}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="">Select Service Type</MenuItem>
            <MenuItem value="Deep Cleaning">Deep Cleaning</MenuItem>
            <MenuItem value="Carpet Cleaning">Carpet Cleaning</MenuItem>
            <MenuItem value="Window Cleaning">Window Cleaning</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Booking
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
