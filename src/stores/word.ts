import type { MyLetter, MyWord } from "src/types/types";
import { writable } from "svelte/store";

function wordStore() {
  const { subscribe, set, update } = writable<MyWord>([]);

  return {
    subscribe,
    add: (letter: MyLetter) => {
      update((prev) => {
        return [...prev, letter];
      });
    },
    removeLast: () => {
      update((prev) => {
        return prev.slice(0, prev.length - 1);
      });
    },
    remove: (index: number) => {
      update((prev) => {
        return prev.slice(index, 1);
      });
    },
    set: (newWord: MyWord) => set(newWord),
    reset: () => set([]),
  };
}

export const word = wordStore();
