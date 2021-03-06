import { writable } from "svelte/store"


function gameMessageStore() {
  const { subscribe, set, update } = writable({message: "", color: ""});

  return {
    subscribe,
    newMessage: (message: string, color: string, duration=5000) => {
      set({message: message, color: color})
      setTimeout(() => {
        set({message: "", color: ""})
      }, duration)
    },
    set: (gameMessage) => set(gameMessage),
    reset: () => set({message: "", color: ""}),
  };
}

export const gameMessage = gameMessageStore();
