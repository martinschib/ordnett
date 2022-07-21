import { game } from "../stores/gameScore";
import { gameMessage } from "../stores/gameMessage";
import { retriveData, storeData } from "./localstorage";
import { pattern } from "../stores/pattern";
import {word} from "../stores/word"

export function calculateWordPoints(word: string) {
  
  return word.length
}

export function getMaxPoints(words : string[]) {
  let points = 0;
  words.forEach((element) => {
    points += calculateWordPoints(element);
  });
  return points;
}

function getDayOfYear(date = new Date()) {
  const timestamp1 = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
  const differenceInMilliseconds = timestamp1 - timestamp2;
  const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

  return differenceInDays;
}

const isValidWord = (newWord: string) => {
  const solutions = retriveData("solutions");
  const myWords = retriveData("my_words");

  if (!solutions) {
    gameMessage.newMessage("Ops!.. Noe har gått galt.", "red");
    return false;
  }

  if (!solutions.includes(newWord)) {
    gameMessage.newMessage("Ordet finnes ikke", "black");
    pattern.reset()
    word.reset()
    return false;
  }

  if (myWords.includes(newWord)) {
    gameMessage.newMessage("Ordet er brukt.", "blue");
    pattern.reset()
    word.reset()
    return false;
  }

  return true;
};

const retriveStartUpData = async () => {
  const today = getDayOfYear(new Date()) % 106

  const storedDay = retriveData("day");

  if (today === storedDay) {
    const wordnett = retriveData("wordnett");
    const maxScore = retriveData("max_score");
    const maxWords = retriveData("max_words");
    const solutions = retriveData("solutions");
    const myWords = retriveData("my_words");

    gameMessage.newMessage("Velkommen tilbake!", "green");

    return { maxScore, maxWords, solutions, wordnett, myWords };
  }

  try {
    const response = await fetch(`wordnetts.json`);
    const data = await response.json()
    console.log(data[`${today}`])
    storeData("wordnett", data[`${today}`].wordnett)
    storeData("max_score", data[`${today}`].maxScore)
    storeData("max_words", data[`${today}`].maxWords)
    storeData("solutions", data[`${today}`].solutions)
    storeData("my_words", [])
    storeData("day", today);

    const wordnett = retriveData("wordnett");
    const maxScore = retriveData("max_score");
    const maxWords = retriveData("max_words");
    const solutions = retriveData("solutions");

    return { maxScore, maxWords, solutions, wordnett, myWords:[] };

  } catch (e) {
    gameMessage.newMessage("Ops!.. Noe har gått galt.", "red");
    return null;
  }

};

export { isValidWord, retriveStartUpData };
