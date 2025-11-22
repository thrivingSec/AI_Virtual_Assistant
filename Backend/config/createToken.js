import jwt from "jsonwebtoken";

export const createToken = (userId, res) => {
  const token = jwt.sign({_id:userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
  res.cookie('jwt', token, {
    maxAge: 7*24*60*60*1000, // cokkie age in milli sec
    httpOnly:true, // protects against the XSS attacks
    sameSite:process.env.NODE_ENV === "production" ? "none" : "lax", // protects agains csrf
    secure: process.env.NODE_ENV === 'production'
  })
}