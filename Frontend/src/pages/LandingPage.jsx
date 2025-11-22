import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io5";
import lpImg from "../assets/forLandinPage.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-linear-to-t from-[#000000] to-[#0e0e58] flex flex-col items-center justify-between py-10 px-6">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          AI Virtual Assistant
        </h1>
        <div className="flex items-center justify-center gap-5">
          <button
            className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black font-semibold hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md cursor-pointer"
            onClick={(e) => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col gap-15 md:flex-row items-center justify-between w-full max-w-6xl mt-20">
        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-4xl font-bold leading-tight text-white">
            Your Personal{" "}
            <span className="text-blue-600 animate-pulse">
              AI Virtual Assistant
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-md">
            A Gemini-powered general-purpose assistant designed to handle simple
            queries and perform basic actions. A personal project built using
            the MERN stack as the core technology.
          </p>

          <div className="flex gap-4 mt-4">
            <button
              className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black font-semibold hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md cursor-pointer"
              onClick={(e) => navigate("/signup")}
            >
              Get Started
            </button>
            <Link
              className="px-3 py-2 bg-blue-600 rounded-full outline-none border-0 text-black font-semibold hover:shadow-md hover:shadow-blue-800 active:bg-gray-500 transition-all duration-300 text-md cursor-pointer"
              to={"https://github.com/thrivingSec/AI_Virtual_Assistant"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github <IoLogoGithub className="inline-block mb-1 size-4" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
          <div className="w-[350px] h-[500px] bg-white flex items-center justify-center rounded-md shadow-2xl shadow-blue-600 overflow-hidden">
            {/* Placeholder for assistant image */}
            <img src={lpImg} alt="AI Assistant" className="h-full w-full " />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-20">
        © 2025 AI Virtual Assistant. Created by Srijan. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
