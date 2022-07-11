import { writable } from 'svelte/store';

function patternStore() {
    const { subscribe, set, update } = writable<number[]>([]);

    return {
		subscribe,
		add: (index: number) => {
            update(prev => {
                return [...prev, index]
            })
        },
        removeLast: () => {
            update(prev => {
                return prev.slice(0, prev.length - 1)
            })
        },
        remove: (index: number ) => {
            update(prev => {
                return prev.slice(index, 1)
            })
        },
        set: (newPattern: number[]) => set(newPattern),
		reset: () => set([])
	};
}

export const pattern = patternStore()
