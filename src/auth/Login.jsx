import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:10000/users");

      const user = response.data.find(
        (user) =>
          user.username === form.username && user.password === form.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        if (user.role === "admin") {
          navigate("/AdminPanel");
        } else {
          navigate("/BookingForm");
        }
      } else {
        alert("Username and password not matching");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        pt={10}
        width={"80%"}
        m="auto"
      >
        <Typography variant="h4" fontWeight="bold" textAlign={"center"}>
          Clearing Service Management System
        </Typography>
      </Box>

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
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>

            <Typography variant="body2" align="center">
              If you haven't registered{" "}
              <Button
                onClick={() => navigate("/auth/Signup")}
                variant="text"
                color="primary"
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
