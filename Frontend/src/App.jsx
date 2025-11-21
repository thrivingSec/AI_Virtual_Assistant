import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./redux/userSlice";
import Loader from "./components/Loader";
import PublicRoutes from "./utils/PublicRoutes";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import PrivateRoutes from "./utils/PrivateRoutes";
import CustomizeImage from "./pages/CustomizeImage";
import Assistant from "./pages/Assistant";
import Error from "./pages/Error";
import SemiPrivateRoutes from "./utils/SemiPrivateRoutes";
import CustomizeName from "./pages/CustomizeName";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <LandingPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoutes>
              <VerifyOtp />
            </PublicRoutes>
          }
        />
        <Route
          path="/customize/image"
          element={
            <SemiPrivateRoutes>
              <CustomizeImage />
            </SemiPrivateRoutes>
          }
        />
        <Route
          path="/customize/name"
          element={
            <SemiPrivateRoutes>
              <CustomizeName />
            </SemiPrivateRoutes>
          }
        />
        <Route
          path="/assistant"
          element={
            <PrivateRoutes>
              <Assistant />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
