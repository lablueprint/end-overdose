import { create } from 'zustand';

interface GameState {
    sceneIndex: number;
    position: { x: number; y: number };
    setScene: (index: number) => void;
    nextScene: () => void;
    prevScene: () => void;
    moveCharacter: (dx: number, dy: number) => void;
    sceneNum: number;
}

const scenes = ['forest', 'candy', 'fire', 'water']; // List of scene names (optional)

export const useGameStore = create<GameState>((set) => ({
    sceneIndex: 0, // Start with the first scene (index 0)
    position: { x: 0, y: 0 },
    setScene: (index) => set({ sceneIndex: index }),
    nextScene: () =>
        set((state) => ({
            sceneIndex: (state.sceneIndex + 1) % scenes.length, // Loops through scenes
        })),
    prevScene: () =>
        set((state) => ({
            sceneIndex:
                state.sceneIndex - 1 < 0
                    ? scenes.length - 1
                    : state.sceneIndex - 1, // Loop backwards
        })),
    moveCharacter: (dx, dy) =>
        set((state) => ({
            position: { x: state.position.x + dx, y: state.position.y + dy },
        })),
    sceneNum: scenes.length,
}));
