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
  console.log(total, percentage,  Math.round((Math.pow((-1*percentage), 2) + 2*percentage) * total))

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



const gameTags = [
  { tag: "Solid", color: "#FEE760" },
  { tag: "Solid", color: "#FEE760" },
  { tag: "Solid", color: "#FEE760" },
  { tag: "Solid", color: "#FEE760" },
  { tag: "God start", color: "#93B2EA" },
  { tag: "God start", color: "#93B2EA" },
  { tag: "WOW!", color: "#93B2EA" },
  { tag: "WOW", color: "#BFE069" },
  { tag: "Gud!!", color: "green" },
  { tag: "GUD!", color: "yellow" },
];

export const gameTag = derived(
  game,
  ($game) => gameTags[parseInt(Math.round(($game.score / $game.maxScore)* 100).toString()[0])]
);

