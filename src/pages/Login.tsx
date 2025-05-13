"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { adminLogin, adminSignup } from "../services/api"
import toast from "react-hot-toast"
import { ChurchIcon as Mosque, User, Mail, Lock, ChevronRight } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    disablePassword: false,
  })

  const [isLogin, setIsLogin] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleLogin = async () => {
    try {
      const response = await adminLogin(formData.email, formData.password)

      console.log("Login response:", response)

      const token = response?.token
      const user = response.data?.user

      if (!token) {
        throw new Error("Token is missing in the response.")
      }

      // Store token and user data
      localStorage.setItem("authToken", token)
      localStorage.setItem("adminPassword", formData.password)
      if (user) {
        localStorage.setItem("userData", JSON.stringify(user))
      }

      // Show success toast
      toast.success("Login successful!")

      // Navigate to dashboard
      navigate("/dashboard")
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message)
        const errorMessage =
          error.response?.status === 401
            ? "Invalid email or password."
            : "An error occurred during login. Please try again."
        toast.error(errorMessage)
      } else {
        console.error("Unexpected error:", error.message || error)
        toast.error(error.message || "An unexpected error occurred.")
      }
    }
  }

  const handleSignUp = async () => {
    try {
      const response = await adminSignup(formData.name, formData.email, formData.password)

      console.log(response)
      toast.success("Sign up successful! Please login.")
      setIsLogin(true)
    } catch (error) {
      console.error("Error during sign up:", error)
      toast.error("Sign up failed", {
        duration: 5000,
        position: "top-right",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Left side - Image and description */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center">
        <div className="max-w-md">
          <div className="flex items-center mb-6">
            <Mosque className="h-10 w-10 text-emerald-700" />
            <h1 className="text-3xl font-bold text-emerald-800 ml-2">PaySadaka</h1>
          </div>

          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Support Your Local Masjid</h2>

          <p className="text-gray-700 mb-6">
            PaySadaka makes it easy to contribute to mosques, Ramadan initiatives, and charities in your area. Join us
            in making a difference in your community.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/masjid interior.png"
                alt="Mosque interior"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/charity.png"
                alt="Charity work"
                className="w-full h-32 object-cover"
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 italic">
              "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
              <span className="block mt-1 font-medium">- Sahih al-Bukhari</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-emerald-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-700">{isLogin ? "Welcome Back" : "Join PaySadaka"}</h2>
            <p className="text-gray-600 mt-2">
              {isLogin
                ? "Sign in to continue your charitable journey"
                : "Create an account to start making a difference"}
            </p>
          </div>

          {!isLogin && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your password"
                disabled={formData.disablePassword}
                required
              />
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                name="disablePassword"
                id="disablePassword"
                checked={formData.disablePassword}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="disablePassword" className="ml-2 text-sm text-gray-700">
                Disable password field
              </label>
            </div>
          </div>

          <button
            onClick={isLogin ? handleLogin : handleSignUp}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 font-medium hover:underline ml-1 focus:outline-none"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              By continuing, you agree to PaySadaka's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
