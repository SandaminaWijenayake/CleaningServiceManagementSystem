import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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
        localStorage.setItem(
          "user",
          JSON.stringify({ username: form.username })
        );
        navigate("/BookingForm");
      } else {
        alert("Username and password not matching");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        If you haven't registered{" "}
        <button
          onClick={() => {
            navigate("/auth/Signup");
          }}
          className="text-blue-600 cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
