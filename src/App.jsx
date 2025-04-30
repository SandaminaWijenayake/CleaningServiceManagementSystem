import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Root } from "./Layouts/Root";
import { Booking } from "./components/Booking";
import { BookingList } from "./components/BookingList";
import { AdminPanel } from "./components/AdminPanel";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Protection from "./components/Potection";
import AdminProtection from "./components/AdminProtection";
import Unauthorized from "./components/Unauthorized";

const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      { path: "Login", Component: Login },
      { path: "Signup", Component: SignUp },
    ],
  },
  {
    path: "/",
    element: <Protection />,
    children: [
      {
        path: "",
        Component: Root,
        children: [
          { index: true, Component: Booking },
          { path: "BookingList", Component: BookingList },
          { path: "BookingForm", Component: Booking },
          {
            path: "AdminPanel",
            element: <AdminProtection />,
            children: [{ index: true, Component: AdminPanel }],
          },
          { path: "unauthorized", Component: Unauthorized },
        ],
      },
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
