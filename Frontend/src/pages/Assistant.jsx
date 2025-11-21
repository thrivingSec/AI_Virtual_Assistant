import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../components/LogoutPopup";
import axios from "axios";
import { serverURL } from "../main";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { callGemini } from "../gemini.js";
import { HiSpeakerWave } from "react-icons/hi2";
import aigif from "../assets/ai.gif";
import usergif from "../assets/user.gif";

const Assistant = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [userText, setUserText] = useState(null);
  const [aiText, setAiText] = useState(null);

  const handleLogout = async (e) => {
    try {
      const { data } = await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const speak = (text) => {
    window.speechSynthesis.cancel(); // ensure clean queue
    const utterence = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterence);
  };

  const handleGeminiResponse = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    if (type === "google_search") {
      const query = encodeURIComponent(response);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    if (type === "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }
    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }
    if (type === "instagram_open") {
      window.open(`https://www.instagram.com/`, "_blank");
    }
    if (type === "facebook_open") {
      window.open(`https://www.facebook.com/`, "_blank");
    }
    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(response);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  };

  const startAssistant = () => {
    setIsActivated(true);
    window.speechSynthesis.cancel();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    speak(
      `Hi! I'm ${user.assistantName}. A virtual assistant created by ${user.name}. How can I help you?`
    );
    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
        setUserText(transcript);
        setAiText(null);
        const data = await callGemini(transcript);
        setUserText(null);
        setAiText(data.response);
        handleGeminiResponse(data);
      }
    };
    recognition.onend = () => recognition.start();
    recognition.start();
  };

  return (
    <div className="w-full h-screen bg-linear-to-t from-[#000000] to-[#000026f5]  relative">
      {!logoutPopup && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
          <div
            className={`w-[300px] h-[300px] rounded-full shadow-2xl  overflow-hidden ${
              aiText
                ? "shadow-[#2121c7]"
                : "shadow-[#06061e] hover:shadow-[#2121c7]"
            } transition-all duration-300`}
          >
            <img
              src={user.assistantImage}
              alt="assistant image"
              className="w-full h-full object-cover"
            />
          </div>
          {isActivated && (
            <h1 className="text-white text-md font-semibold">
              I'm {user.assistantName}
            </h1>
          )}
          {!isActivated && (
            <button
              className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black text-md font-semibold hover:shadow-lg hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md  cursor-pointer"
              onClick={startAssistant}
            >
              Ask {user.assistantName}{" "}
              <HiSpeakerWave className="inline-block ml-2 mb-1" />
            </button>
          )}
          {/* {aiText && (
            <img src={aigif} alt="ai speaking" className="w-[200px] bg-white" />
          )}
          {!aiText && <img src={usergif} alt="user speaking" className="" />} */}
          {aiText && (
            <div className="w-[80%] flex justify-center items-center text-white">
              <div className="text-center">{aiText}</div>
            </div>
          )}
          {userText && (
            <div className="w-[80%] flex justify-center items-center text-white">
              <div className="text-center">{userText}</div>
            </div>
          )}
          <button
            className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-lg hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 fixed top-12 right-5 z-10 cursor-pointer"
            onClick={(e) => setLogoutPopup(true)}
          >
            Logout
          </button>
          <button
            className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-lg hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 fixed top-25 right-5 z-10 cursor-pointer"
            onClick={(e) => navigate("/customize/image")}
          >
            Customize
          </button>
        </div>
      )}
      {logoutPopup && (
        <LogoutPopup
          handleLogoutPopup={setLogoutPopup}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Assistant;
