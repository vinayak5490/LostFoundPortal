import React from 'react'
// import bgImage from '../assets/bg-imag.svg'

const Home = () => {
  return (
    <div
      className="min-h-screen w-full pt-24 flex items-center justify-center bg-cover bg-center"
      style={{
        // backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="w-full bg-white bg-opacity-80 rounded-xl shadow-lg p-16 mx-8 text-center border border-blue-200">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 drop-shadow font-serif">
          Welcome to Lost &amp; Found Portal
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-serif">
          Find your lost items or help others by posting found items.<br />
          Sign up or log in to get started!
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="/login"
            className="px-8 py-3 bg-blue-700 text-white rounded shadow hover:bg-blue-900 transition font-semibold border border-blue-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-8 py-3 bg-white text-blue-700 border border-blue-700 rounded shadow hover:bg-blue-100 transition font-semibold"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home