import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { adminLogin, adminSignup } from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    disablePassword: false
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await adminLogin(formData.email, formData.password);

      // Ensure you log the response structure for debugging
      console.log("Login response:", response);

      const token = response?.token;
      const user = response.data?.user;

      if (!token) {
        throw new Error("Token is missing in the response.");
      }

      // Store token and user data
      localStorage.setItem("authToken", token);
      localStorage.setItem("adminPassword", formData.password);
      if (user) {
        localStorage.setItem("userData", JSON.stringify(user));
      }

      // Show success toast
      toast.success("Login successful!");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        const errorMessage =
          error.response?.status === 401
            ? "Invalid email or password."
            : "An error occurred during login. Please try again.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error.message || error);
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await adminSignup(
        formData.name,
        formData.email,
        formData.password
      );

      console.log(response);
      toast.success("Sign up successful! Please login.");
      setIsLogin(true);
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Sign up failed", {
        duration: 5000,
        position: "top-right"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
          {isLogin ? "Welcome Back" : "Sign Up"}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4 capitalize">
          enter password to login
        </p>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            disabled={formData.disablePassword}
            required
          />
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              name="disablePassword"
              checked={formData.disablePassword}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Disable password field
            </label>
          </div>
        </div>

        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-medium hover:underline ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
