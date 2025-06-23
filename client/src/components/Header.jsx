import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-lg py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* Logo/Icon */}
        <span className="text-3xl">🔎</span>
        <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow">
          <Link to="/">Lost and Found</Link>
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-white text-white rounded transition duration-200 hover:bg-white hover:text-blue-600 hover:shadow">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-white text-blue-600 rounded transition duration-200 hover:bg-blue-100 hover:shadow">
            Signup
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header