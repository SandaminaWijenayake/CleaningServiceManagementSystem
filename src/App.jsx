import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Root } from "./Layouts/Root";
import { Booking } from "./components/Booking";
import { BookingList } from "./components/BookingList";
import { AdminPanel } from "./components/AdminPanel";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Booking },
      {
        path: "auth",
        children: [
          { path: "Login", Component: Login },
          { path: "Signup", Component: SignUp },
        ],
      },
      { path: "BookingForm", Component: Booking },
      { path: "BookingList", Component: BookingList },
      { path: "AdminPanel", Component: AdminPanel },
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
