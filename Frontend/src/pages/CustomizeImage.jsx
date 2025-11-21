import React, { useRef, useState } from "react";
import Cards from "../components/Cards";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/originalAuth.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../main";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomizeImage = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputImage = useRef();
  const [frontendImage, setFrontendImage] = useState(
    user.assistantImage || null
  );
  const [backendImage, setBackendImage] = useState(user.assistantImage || null);
  const [upload, setUpload] = useState(false);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const selectFromGivenImage = (file) => {
    setFrontendImage(file);
    setBackendImage(file);
  };
  const handleImageUpload = async (e) => {
    try {
      if (backendImage) {
        setUpload(true);
        if (typeof backendImage === "string") {
          const { data } = await axios.put(
            `${serverURL}/api/user/update`,
            { imageUrl: backendImage },
            { withCredentials: true }
          );
          dispatch(setUser(data));
          toast.success("Assistant image uploaded.");
          navigate("/customize/name");
        }
        if (typeof backendImage === "object") {
          const formData = new FormData();
          formData.append("assistantImage", backendImage);
          const { data } = await axios.put(
            `${serverURL}/api/user/update`,
            formData,
            { withCredentials: true }
          );
          dispatch(setUser(data));
          toast.success("Assistant image uploaded.");
          navigate("/customize/name");
        }
        setUpload(false);
      }
    } catch (error) {
      setUpload(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-screen bg-linear-to-t from-[#000000] to-[#010152f5] flex flex-col items-center justify-center gap-10">
      <h1 className="text-lg md:text-2xl font-semibold text-white mt-10 lg:mt-0">
        Select image for your{" "}
        <span className="text-blue-400">Virtual Assistant</span>
      </h1>
      <div className="max-w-[80%] lg:w-[70%] mx-auto flex flex-wrap justify-center items-center gap-5 lg:px-10">
        <Cards
          image={image1}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image2}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image3}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image4}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image5}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image6}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <Cards
          image={image7}
          handleGivenImage={selectFromGivenImage}
          frontendImage={frontendImage}
        />
        <div className="w-30 h-50 lg:w-40 lg:h-60 bg-gray-900 rounded-md border-2 border-purple-600 flex items-center justify-center hover:border-4 hover:border-gray-200 hover:shadow-2xl hover:shadow-blue-600 transition-all duration-300 overflow-hidden relative">
          {frontendImage && backendImage ? (
            <div className="w-full h-full overflow-hidden">
              <img
                src={frontendImage}
                alt="selected image"
                className="w-full h-full object-cover"
                onClick={(e) => inputImage.current.click()}
              />
              <div
                className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full rounded-md bg-gray-300/25"
                onClick={(e) => inputImage.current.click()}
              >
                <LuImagePlus className="size-7 text-white" />
                <p className="text-md text-white">Upload</p>
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center`}
              onClick={(e) => inputImage.current.click()}
            >
              <LuImagePlus className="size-7 text-white" />
              <p className="text-md text-gray-400">Upload</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputImage}
            onChange={handleImage}
          />
        </div>
      </div>
      {frontendImage && backendImage && (
        <button
          className="px-5 py-3 w-[200px] bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-2xl font-semibold mb-5 cursor-pointer"
          onClick={(e) => handleImageUpload(e)}
        >
          {upload ? "Updating..." : "Next"}
        </button>
      )}
      {user.assistantImage && (
        <button
          className="px-3 py-2 bg-white rounded-full outline-none border-0 text-black hover:shadow-md hover:shadow-gray-500 active:bg-gray-500 transition-all duration-300 text-md mb-5 fixed top-12 right-5 z-10 cursor-pointer"
          onClick={(e) => navigate("/customize/name")}
        >
          Set assistant name
        </button>
      )}
    </div>
  );
};

export default CustomizeImage;
