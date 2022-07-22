import { writable } from "svelte/store";

function wordStore() {
  const { subscribe, set, update } = writable<string[]>([]);

  return {
    subscribe,
    add: (letter: string) => {
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
    set: (newWord: string[]) => set(newWord),
    reset: () => set([]),
  };
}

export const word = wordStore();



function newWordStore() {
  const { subscribe, set, update } = writable<{letter: string, typed: boolean}[]>([]);

  return {
    subscribe,
    add: (letter: {letter: string, typed: boolean}) => {
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
    set: (newWord: {letter: string, typed: boolean}[]) => set(newWord),
    reset: () => set([]),
  };
}

export const newWord = newWordStore();
