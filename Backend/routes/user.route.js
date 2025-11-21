import express from 'express';
import { askAssistant, getCurrentUser, userUpdate } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';

const route = express.Router();

// @api dsc: get current user data;
// @api method: GET
// @api end point: /api/user/current
route.get("/current", isAuthenticated, getCurrentUser);

// @api dsc: update current user assistant details;
// @api method: PUT
// @api end point: /api/user/update
route.put("/update", isAuthenticated, upload.single('assistantImage'), userUpdate);

// @api dsc: ask assistant and get response;
// @api method: POST
// @api end point: /api/user/interact
route.post("/interact", isAuthenticated, askAssistant);

export default route;
