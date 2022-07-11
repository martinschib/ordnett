import { writable, derived } from "svelte/store";

function gameStore() {
  const { subscribe, update, set } = writable({
    words: [],
    maxWords: 50,
    score: 0,
    maxScore: 120,
    leaderboard: 0,
    numPlayers: 0
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
      })
  }
}

export const game = gameStore();

export const gameScorePercentage = derived(
  game,
  ($game) => (-1* ($game.score / $game.maxScore)**2 + 2 * ($game.score / $game.maxScore))*100
);
