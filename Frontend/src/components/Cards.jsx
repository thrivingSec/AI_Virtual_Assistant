import React from "react";

const Cards = ({ image, handleGivenImage, frontendImage }) => {
  return (
    <div
      className={`w-30 h-50 lg:w-40 lg:h-60 bg-gray-900 rounded-md  flex items-center justify-center hover:border-4 transition-all duration-300 overflow-hidden ${
        frontendImage === image
          ? "border-4 border-gray-200 shadow-2xl shadow-blue-600"
          : "border-2 border-purple-600 hover:shadow-2xl hover:shadow-blue-600 hover:border-gray-200"
      } `}
      onClick={(e) => handleGivenImage(image)}
    >
      <img
        src={image}
        alt="assistant image"
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};

export default Cards;
