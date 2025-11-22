import express from "express";
import bodyParser from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"

dotenv.config({ path: "./.env" });

const app = express();

// cors config
app.use(cors({
  origin:"https://ai-virtual-assistant-t36d.onrender.com",
  credentials:true
}))

// json body parser
app.use(bodyParser.json());
// cookie parser
app.use(cookieParser());

// auth router
app.use('/api/auth', authRouter);
// user router
app.use("/api/user", userRouter)



app.listen(process.env.PORT || 3000, () => {
  connectDB()
    .then((connectionString) => {
      console.log(
        `Server is running on http://loclhost:${
          process.env.PORT || 3000
        }\nDatabase connected at ${connectionString}`
      );
    })
    .catch((e) => console.log("Error in connectDB :: ", e));
});
