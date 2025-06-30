import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500/90 shadow-lg border-b border-blue-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl">🔎</span>
          <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow font-serif">
            TraceIt 
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-white text-blue-700 rounded transition duration-200 hover:bg-blue-100 hover:shadow font-semibold border border-blue-200">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-white text-white rounded transition duration-200 hover:bg-white hover:text-blue-700 hover:shadow font-semibold"
              >
                Logout
              </button>
            

            <Link to="/createnew">
            <button className="px-4 py-2 bg-white text-blue-700 rounded transition duration-200 hover:bg-blue-100 hover:shadow font-semibold border border-blue-200">
              POST
            </button>
            </Link>
            
            <Link to="/profile">
            <button className="px-4 py-2 bg-white text-blue-700 rounded transition duration-200 hover:bg-blue-100 hover:shadow font-semibold border border-blue-200">
              Profile
            </button>
            
            </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 border border-white text-white rounded transition duration-200 hover:bg-white hover:text-blue-700 hover:shadow font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-white text-blue-700 rounded transition duration-200 hover:bg-blue-100 hover:shadow font-semibold border border-blue-200">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header