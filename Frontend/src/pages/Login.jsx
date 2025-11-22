import React, { useState } from "react";
import bg from "../assets/AuthImage.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverURL } from "../main";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice.js";

const Login = () => {
  const [viewPass, setViewPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const [login, setLogin] = useState(false);
  const formValidator = (data) => {
    if (!data.email.trim()) return toast.error("email is rewuired!");
    if (!/\S+@\S+\.\S+/.test(data.email.trim()))
      return toast.error("Invalid email!");
    if (!data.password.trim()) return toast.error("Password is required");
    return true;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const validation = formValidator(formData);
      if (validation === true) {
        setLogin(true);
        const response = await axios.post(
          `${serverURL}/api/auth/login`,
          formData,
          {
            withCredentials: true,
          }
        );

        setLogin(false);
        setFormData({ email: null, passowrd: null });
        console.log(response);
        dispatch(setUser(response.data));
        navigate("/assistant");
      }
    } catch (error) {
      setLogin(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className="h-screen w-full bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] max-w-[500px] h-[500px] bg-[#000000a0] backdrop-blur shadow-lg shadow-black rounded-md flex flex-col items-center justify-center gap-5 px-10"
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="text-white text-2xl font-semibold mb-5">
          Login to{" "}
          <span className="text-blue-600 font-bold animate-pulse">
            Virtual Assistant
          </span>
        </h1>
        <input
          type="email"
          className="w-full bg-transparent outline-none border-2 border-white rounded-md placeholder-gray-400 h-12 px-5 shadow-lg shadow-black text-white"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email ? formData.email : ""}
        />
        <div className="w-full relative">
          <input
            type={viewPass ? "text" : "password"}
            className="w-full bg-transparent outline-none border-2 border-white rounded-md placeholder-gray-400 h-12 px-5 shadow-lg shadow-black text-white"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password ? formData.password : ""}
          />
          {!viewPass ? (
            <FaEye
              className="absolute top-4 right-5 size-4 text-gray-400 cursor-pointer"
              onClick={(e) => setViewPass(true)}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-4 right-5 size-4 text-gray-400 cursor-pointer"
              onClick={(e) => setViewPass(false)}
            />
          )}
        </div>
        <button
          className="min-w-[150px] px-4 py-4 bg-white text-black text-md font-semibold hover:bg-blue-500 hover:text-white active:bg-blue-700 transition-all duration-300 cursor-pointer rounded-md mt-5 shadow-lg shadow-black"
          disabled={login ? true : false}
        >
          {login ? "Sending data ..." : "Login"}
        </button>
        <p className="text-md text-white mt-5">
          Don't have an account?{" "}
          <span
            className="text-md text-blue-600 font-semibold cursor-pointer"
            onClick={(e) => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
