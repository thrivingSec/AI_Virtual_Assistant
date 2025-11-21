import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token) return res.status(401).json({message:"Unauthorized - token not provided",success:false});
    
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decode) return res.status(401).json({message:"Unauthorized - invalid token", success:false});
    
    const userId = decode._id;
    
    const user = await User.findById(userId);
    
    if(!user) return res.status(401).json({message:"Unauthorized - user not found", success:false});
    
    if(!user.verified) return res.status(401).json({message:"Unauthorized - unverified user", success:false});
    
    req.userId = user._id;
    
    next()
  } catch (error) {
    console.log('Error in isAuth :: ', error.message);
    res.status(500).json({message:"Internal server error", success:false});
  }
}