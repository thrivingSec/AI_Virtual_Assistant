import React from "react";

const LogoutPopup = ({ handleLogoutPopup, handleLogout }) => {
  return (
    <div
      className="w-full h-full inset-0 flex items-center justify-center bg-[#0303038e]"
      onClick={(e) => handleLogoutPopup(false)}
    >
      <div className="w-[80%] lg:w-xl bg-[#000000a0] backdrop-blur shadow-lg shadow-black rounded-md flex flex-col items-center justify-center gap-5 px-10">
        <h1 className="text-white text-md font-semibold mb-5 text-center mt-10">
          Do you want to logout from{" "}
          <span className="text-blue-600 font-bold animate-pulse">
            Virtual Assistant
          </span>
          ?
        </h1>
        <div className="w-full flex items-center justify-center gap-10">
          <button
            className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-green-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 cursor-pointer"
            onClick={(e) => handleLogoutPopup(false)}
          >
            No
          </button>
          <button
            className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-red-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 cursor-pointer"
            onClick={(e) => handleLogout()}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
