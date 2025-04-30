import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

      const response = await axios.post("http://localhost:10000/users", form);

      localStorage.setItem(
        "user",
        JSON.stringify({ username: response.data.username })
      );

      navigate("/auth/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
          Sign Up
        </button>
        <div>
          Already have an account?{" "}
          <button
            onClick={() => {
              navigate("/auth/Login");
            }}
            className="text-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
