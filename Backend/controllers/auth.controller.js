import { createOtp } from "../config/createOtp.js";
import { createToken } from "../config/createToken.js";
import { sendVerificationMail } from "../config/nodemailer.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password) return res.status(400).json({message:'All filds are required.', success:false});

    if(password.length < 6) return res.status(400).json({message:'Password must be atleast 6 character long.'});

    let existUser = await User.findOne({email});

    if(existUser && existUser.verified) return res.status(400).json({message:"Email already in use.", success:false});

    const otp = createOtp()
    const expiry = Date.now() + 2 * 60 * 1000;
    const encryptPass = await bcrypt.hash(password, 10);

    if(existUser && !existUser.verified){
      existUser.name = name;
      existUser.email = email;
      existUser.password = encryptPass;
      existUser.verificationCode = otp.toString();
      existUser.verificationExpiry = expiry;
      await existUser.save()
      await sendVerificationMail(email, Number(otp));
      return res.status(200).json({email,success:true})
    }

    
    if(!existUser){
      existUser = await User.create({name, email, password:encryptPass, verificationCode:otp, verificationExpiry:expiry})
      await sendVerificationMail(email, Number(otp));
    }

    return res.status(200).json({email,success:true})

  } catch (error) {
    console.log('Error in signup :: ', error);
    res.status(500).json({message:"Internal server error."});
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const {email, otp} = req.body;

    if(!email || !otp) return res.status(400).json({message:"Invalid request.", success:false});

    let user = await User.findOne({email});

    if(!user) return res.status(400).json({message:"Email not found.", success:false});

    if(user.verified) return res.status(400).json({message:"Email already verified.", success:false});

    if(user.verificationExpiry < Date.now()) return res.status(400).json({message:"OTP Expired.", success:false});

    if(user.verificationCode !== otp) return res.status(400).json({message:"Invalid otp.", success:false});

    user.verified = true;
    user.verificationCode = undefined;
    user.verificationExpiry = undefined;

    await user.save();
    user = await User.findById(user._id).select("-password -verified -verificationCode -verificationExpiry")
    createToken(user._id, res);

    return res.status(200).json(user);

  } catch (error) {
    console.log('Error in verifyOtp :: ', error);
    res.status(500).json({message:"Internal server error."})
  }
}

export const resendOtp = async (req, res) => {
  try {
    const {email} = req.body;
    
    if(!email) return res.status(400).json({message:"Invalid request.", success:false});

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({message:"User not found.", success:false});

    if(user.verified) return res.status(400).json({message:"Email already verified.", success:false});

    const otp = createOtp();
    const expiry = Date.now() + 2 * 60 * 1000;
    user.verificationCode = otp.toString();
    user.verificationExpiry = expiry;
    await user.save();
    await sendVerificationMail(email, otp)  


    return res.status(200).json({message:"New OTP sent.", success:true})

  } catch (error) {
    console.log('Error in resendOtp :: ', error);
    res.status(500).json({message:"Internal server error."})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).json({message:"All fields are required.", success:true});

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({message:"Unauthorized - user does not exists."});

    const compare = await bcrypt.compare(password, user.password);

    if(!compare) return res.status(400).json({message:"Unauthorized - invalid credentials", success:false});

    createToken(user._id, res);

    res.status(200).json(user);
    
  } catch (error) {
    console.log('Error in login :: ', error);
    res.status(500).json({message:"Internal server error."})
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({message:"Logged out successfully", success:true}); 
  } catch (error) {
    console.log('Error in logout :: ', error);
    res.status(500).json({message:"Internal server error."})
  }
}

