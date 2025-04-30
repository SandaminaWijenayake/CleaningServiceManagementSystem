import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
// import { LoginPage } from "./components/LoginPage";
import { Home } from "./components/Home";
import { Root } from "./Layouts/Root";
import { Booking } from "./components/Booking";
import { BookingList } from "./components/BookingList";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Booking },

      { path: "BookingForm", Component: Booking },
      { path: "BookingList", Component: BookingList },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
