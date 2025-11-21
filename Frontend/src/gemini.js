import axios from "axios";
import { serverURL } from "./main";
export const callGemini = async (command) => {
  try {
    const { data } = await axios.post(
      `${serverURL}/api/user/interact`,
      { command },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return JSON.stringify({
      type: "error",
      userInput: command,
      response: `Sorry! ${error.response.data.message}`,
    });
  }
};


