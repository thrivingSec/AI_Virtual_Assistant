import { response } from "express";
import { imageUpload } from "../config/cloudinary.js";
import { geminiResponse } from "../gemini/gemini.js";
import { User } from "../models/user.model.js";
import moment from "moment/moment.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -verificationCode -verificationExpiry -verified");

    if(!user) return res.status(400).json({message:"user not found", success:false});

    return res.status(200).json(user)

  } catch (error) {
    console.log('Error in getCurrentUSer ::', error.message);
    res.status(400).json({message:"Internal server error", success:false});
  }
}

export const userUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    const {assistantName, imageUrl} = req.body;
    let assistantImage;
    if(req.file){
      assistantImage = await imageUpload(req.file.path);
    }else if(imageUrl){
      assistantImage = imageUrl;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {assistantName,assistantImage}, {new:true}).select("-password -verified -verificationExpiry -verificationCode");
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log('Error in userUpdate :: ', error.message);
    res.status(500).json({message:"Internal server error", success:false});
  }
}

export const askAssistant = async (req, res) => {
  try {
    const userId = req.userId;
    const {command} = req.body;
    
    if(!command) return res.status(400).json({type:"error",userInput:null,response:"Invalid user input"});
    
    const user = await User.findById(userId);

    if(!user.assistantName || !user.assistantImage ) return res.status(400).json({type:"error",userInput:null,response:"Unauthorized to access assistant"})
  
    const assistantName = user.assistantName;
    const ownerName = user.name;
    
    const llmResponse = await geminiResponse(assistantName, ownerName, command);

    const jsonResponse = JSON.parse(llmResponse);

    user.history.push(jsonResponse);
    await user.save();

    const type = jsonResponse.type;

    switch(type){
      case 'get_time':
        return res.status(200).json({
          type,
          userInput:jsonResponse.userInput,
          response:`Current time is ${moment().format("HH:mm:A")}`
        })
      case 'get_date':
        return res.status(200).json({
          type,
          userInput:jsonResponse.userInput,
          response:`Current date is ${moment().format("YYYY-MM-DD")}`
        })
      case 'get_day':
        return res.status(200).json({
          type,
          userInput:jsonResponse.userInput,
          response:`Current day is ${moment().format("dddd")}`
        })
      case 'get_month':
        return res.status(200).json({
          type,
          userInput:jsonResponse.userInput,
          response:`Current month is ${moment().format("MMMM")}`
        })
      case 'general':
      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'calculator_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'weather_show':
        return res.status(200).json({
          type,
          userInput:jsonResponse.userInput,
          response:jsonResponse.response
        })
      default:
        return res.status(200).json({
          type:"error",
          userInput:jsonResponse.userInput,
          response:"Sorry I did not undestand your command"
        }) 
      
    }

  } catch (error) {
    console.log('Error in askAssistant :: ', error.message);
    res.status(500).json({
      type:"error",
      response:"Internal error occoured"
    })
  }
}