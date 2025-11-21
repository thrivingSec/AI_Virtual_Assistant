import express from 'express';
import { login, logout, resendOtp, signup, verifyOtp } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/isAuth.js';

const route = express.Router();

// @api dsc: user signup
// @api method: POST
// @api endpoint: /api/auth/signup
route.post("/signup", signup);

// @api dsc: user otp verification
// @api method: POST
// @api endpoint: /api/auth/verify
route.post("/verify", verifyOtp);

// @api dsc: user otp verification
// @api method: POST
// @api endpoint: /api/auth/resend
route.post("/resend", resendOtp);

// @api dsc: user login
// @api method: POST
// @api endpoint: /api/auth/login
route.post("/login", login);

// @api dsc: user logout
// @api method: POST
// @api endpoint: /api/auth/logout
route.post("/logout", isAuthenticated, logout);

export default route;