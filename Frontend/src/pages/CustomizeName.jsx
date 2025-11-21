import axios from "axios";
import React, { useState } from "react";
import { serverURL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const CustomizeName = () => {
  const { user } = useSelector((store) => store.user);
  const [name, setName] = useState(user.assistantName || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAssistantName = async (e) => {
    try {
      if (name.length > 0) {
        const { data } = await axios.put(
          `${serverURL}/api/user/update`,
          { assistantName: name },
          { withCredentials: true }
        );
        dispatch(setUser(data));
        navigate("/assistant");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen bg-linear-to-t from-[#000000] to-[#010152f5] flex flex-col items-center justify-center gap-10 relative">
      <h1 className="text-lg md:text-2xl font-semibold text-white mt-10 lg:mt-0">
        Select name for your{" "}
        <span className="text-blue-400">Virtual Assistant</span>
      </h1>
      <input
        type="text"
        className="w-xl bg-transparent outline-none border-2 border-white rounded-full placeholder-gray-400 h-12 px-5 shadow-lg shadow-black text-white"
        placeholder="eg. Devin"
        onChange={(e) => setName(e.target.value)}
        value={name ? name : ""}
      />
      {name && (
        <button
          className="px-5 py-3 bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-lg font-semibold mb-5 cursor-pointer"
          onClick={(e) => handleAssistantName(e)}
        >
          Create {name}
        </button>
      )}
      {user?.assistantName && (
        <button
          className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 fixed top-12 right-5 z-10 cursor-pointer"
          onClick={(e) => navigate("/assistant")}
        >
          Assistant
        </button>
      )}
    </div>
  );
};

export default CustomizeName;
