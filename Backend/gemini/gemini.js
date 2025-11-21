import dotenv from 'dotenv';
import axios from 'axios';
import { buildContext } from './contextString.js';

dotenv.config();

export const geminiResponse = async (assistantName, ownerName, userInput) => {
  try {
    const apiUrl = process.env.GEMINI_URL
    const apiKey = process.env.GEMINI_API_KEY
    const headers = {
      "x-goog-api-key": apiKey,
      "Content-Type":"application/json"
    }
    const prompt = buildContext(assistantName, ownerName, userInput);
    const {data} = await axios.post(apiUrl, {"contents": [
      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]}, {headers})
    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.log('Error in geminiResponse :: ', error);
    return JSON.stringify({
      type:"error",
      userInput,
      response:"Internal error occoured"
    })
  }
} 

