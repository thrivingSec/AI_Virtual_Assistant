import React, { useEffect, useState } from "react";
import bg from "../assets/AuthImage.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

const VerifyOtp = () => {
  const { verificationEmail } = useSelector((store) => store.verificationEmail);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const [otp, setOtp] = useState(null);

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      if (otp?.toString().length === 5) {
        const response = await axios.post(
          `${serverURL}/api/auth/verify`,
          { email: verificationEmail, otp },
          { withCredentials: true }
        );
        if (response.data._id) {
          dispatch(setUser(response.data));
          navigate("/customize/image");
        }
      } else {
        toast.error("Please enter valid otp");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleResendOtp = async (e) => {
    try {
      if (timer === 0) {
        const response = await axios.post(
          `${serverURL}/api/auth/resend`,
          { email: verificationEmail },
          { withCredentials: true }
        );
        if (response.data.success === true) {
          toast.success(response.data.message);
          setTimer(120);
        }
      }
    } catch (error) {
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
        onSubmit={(e) => handleOtpVerification(e)}
      >
        <h1 className="text-white text-2xl font-semibold mb-5">
          Register to{" "}
          <span className="text-blue-600 font-bold animate-pulse">
            Virtual Assistant
          </span>
        </h1>
        <h2 className="text-white text-md font-semibold">
          OTP has been sent to your email:
        </h2>
        <h2 className="text-blue-600 text-md font-semibold">
          {verificationEmail}
        </h2>
        {timer > 0 ? (
          <p className="text-center text-white">
            OTP expires in {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        ) : (
          <p className="text-center text-gray-300 text-md font-semibold">
            OTP Expired.{" "}
            <span
              className="text-blue-600 font-bold cursor-pointer"
              onClick={(e) => handleResendOtp(e)}
            >
              Resend
            </span>
          </p>
        )}
        <input
          type="text"
          className="w-full bg-transparent outline-none border-2 border-white rounded-md placeholder-gray-400 h-12 px-5 shadow-lg shadow-black text-white"
          placeholder="OTP"
          onChange={(e) => setOtp(e.target.value)}
          value={otp ? otp : ""}
        />
        <button className="min-w-[150px] px-4 py-4 bg-white text-black text-md font-semibold hover:bg-blue-500 hover:text-white active:bg-blue-700 transition-all duration-300 cursor-pointer rounded-md mt-5 shadow-lg shadow-black">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
