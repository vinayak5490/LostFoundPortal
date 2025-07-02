import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { use } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
      const navigate = useNavigate();

      const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
      }

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/signup', formData);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
            toast.success("signup successful");
            navigate('/dashboard');
            console.log(res.data);
        } catch (error) {
            console.error(error)
            toast.error('signup Failed: '+(error.response?.message?.data || 'Server error'));
        }
      }

    
  return (
    <div className="min-h-screen flex items-center justify-center shadow-lg ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Sign Up</h2>
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold shadow"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp