import { writable, derived } from "svelte/store";

function gameStore() {
  const { subscribe, update, set } = writable({
    words: [],
    maxWords: 50,
    score: 0,
    maxScore: 120,
    solutions: [],
  });

  return {
    subscribe,
    update: (game) => {
      update((prev) => {
        return {...prev, ...game}
      });
    },
    addWord: (word: string) => {
      update((prev) => {
        return { ...prev, words: [...prev.words, word] };
      });
    },
    setMaxWords: (maxWords: number) =>
      update((prev) => {
        return { ...prev, maxWords: maxWords };
      }),
    setMaxScore: (maxScore: number) => 
      update((prev) => {
        return {...prev, maxScore: maxScore}
      }),
    setScore: (score: number) => 
      update((prev) => {
        return {...prev, score: score}
      }),
    addScore: (score: number) => 
      update((prev) => {
        return {...prev, score: prev.score + score}
      }),
  }
}

export const game = gameStore();


export const pointFunction = (percentage: number, total: number) => {
  return Math.round(Math.pow((percentage), 2) * total)
}

export const gameScorePercentage1 = derived(
  game,
  ($game) => (0.9875184*($game.score / $game.maxScore)**0.465751)*100
);

export const gameScorePercentageReal = derived(
  game,
  ($game) => ($game.score / $game.maxScore) * 100
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
  ($game) => gameTags[parseInt(((0.9875184*($game.score / $game.maxScore)**0.465751)*100).toString()).toString()[0]]
);

