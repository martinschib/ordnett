import type { GameData, GameDataUpdate } from "src/types/types";
import { writable, derived } from "svelte/store";

function gameStore() {
  const { subscribe, update } = writable<GameData>({
    myWords: [],
    maxWords: 50,
    myScore: 0,
    maxScore: 120,
    solutions: [],
  });

  return {
    subscribe,
    update: (game: GameDataUpdate) => {
      update((prev) => {
        return {...prev, ...game}
      });
    },
    addWord: (word: string) => {
      update((prev) => {
        return { ...prev, words: [...prev.myWords, word] };
      });
    },
    setMaxWords: (maxWords: GameData["maxWords"]) =>
      update((prev) => {
        return { ...prev, maxWords: maxWords };
      }),
    setMaxScore: (maxScore: GameData["maxScore"]) => 
      update((prev) => {
        return {...prev, maxScore: maxScore}
      }),
    setScore: (score: GameData["myScore"]) => 
      update((prev) => {
        return {...prev, score: score}
      }),
    addScore: (score: number) => 
      update((prev) => {
        return {...prev, score: prev.myScore + score}
      }),
  }
}

export const game = gameStore();

export const gameScorePercentageAdjusted = derived(
  game,
  ($game) => (0.9875184*($game.myScore / $game.maxScore)**0.465751)*100
);

export const gameTags = [
  { tag: "Nybegynner", color: "#FEE760" },
  { tag: "God start", color: "#FF6A5E" },
  { tag: "God start", color: "#FF6A5E" },
  { tag: "Solid", color: "#B7ACE4" },
  { tag: "Mester", color: "#FF9457" },
  { tag: "Mester", color: "#FF9457" },
  { tag: "Utmerket", color: "#FCE875" },
  { tag: "Utmerket", color: "#FCE875" },
  { tag: "Geni", color: "#A0BBED" },
  { tag: "Geni", color: "#A0BBED" },
];

export const gameTag = derived(
  game,
  ($game) => gameTags[parseInt(((0.9875184*($game.myScore / $game.maxScore)**0.465751)*100).toString()).toString()[0]]
);

