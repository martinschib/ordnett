import { gameMessage } from "../stores/gameMessage";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const checkWord = async (word: string) => {
  const userId = getCookie("ordnett_userid");

  try {
    // Default options are marked with *
    const response = await fetch("http://localhost:3001/api/dagens-ordnett/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "userid": userId
      },
      body: JSON.stringify({ word: word.toLowerCase() })
    });

    return response.json();
  } catch (e) {
    gameMessage.newMessage("Noe gikk galt... hmmm", "red")
    return null;
  }
};

const getStartUpData = async () => {
    const userId = getCookie("ordnett_userid");
    
    try {
        const response = await fetch("http://localhost:3001/api/dagens-ordnett/", {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "userid": userId
            },
          });
        return response.json()
    } catch (e) {
        gameMessage.newMessage("Ops!.. Noe har gått galt.", "red")
        return null;
    }
    
}

export { checkWord, getCookie, getStartUpData };
