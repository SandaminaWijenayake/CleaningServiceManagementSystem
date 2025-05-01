import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const Signup = () => {
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
      const existingUsersResponse = await axios.get(
        "http://localhost:10000/users"
      );

      const existingUser = existingUsersResponse.data.find(
        (user) => user.username === form.username
      );

      if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      await axios.post("http://localhost:10000/users", {
        ...form,
        role: "user",
      });

      navigate("/auth/login");
    } catch (error) {
      console.error("Error signing up:", error);
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
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Sign Up
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
              Sign Up
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button
                onClick={() => navigate("/auth/Login")}
                variant="text"
                color="primary"
                size="small"
              >
                Login
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
