import React from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/auth/Login");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          maxWidth: 1000,
          mx: "auto",
          width: "100%",
        }}
      >
        {user?.role !== "admin" && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: "black",
                fontWeight: 600,
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
            >
              Booking Form
            </Button>
            <Button
              component={RouterLink}
              to="/BookingList"
              sx={{
                color: "black",
                fontWeight: 600,
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
            >
              Manage Bookings
            </Button>
          </Box>
        )}
        {user && (
          <Button
            onClick={handleLogout}
            sx={{
              color: "primary.main",
              fontWeight: 600,
              "&:hover": { color: "black", textDecoration: "underline" },
            }}
          >
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
