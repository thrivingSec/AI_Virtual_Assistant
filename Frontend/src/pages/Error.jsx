import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-3 text-gray-500 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Check the
        URL or return to the homepage.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </button>

      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-32 h-32 text-gray-400"
          fill="currentColor"
        >
          <path d="M32 4C17.641 4 6 15.641 6 30s11.641 26 26 26 26-11.641 26-26S46.359 4 32 4zm0 48c-12.131 0-22-9.869-22-22S19.869 8 32 8s22 9.869 22 22-9.869 22-22 22z" />
          <circle cx="21" cy="26" r="3" />
          <circle cx="43" cy="26" r="3" />
          <path d="M22 42c.553 0 1-.447 1-1 0-2.206 3.589-4 9-4s9 1.794 9 4c0 .553.447 1 1 1s1-.447 1-1c0-3.86-4.486-6-11-6s-11 2.14-11 6c0 .553.447 1 1 1z" />
        </svg>
      </div>
    </div>
  );
};

export default Error;
