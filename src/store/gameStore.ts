import { create } from 'zustand';
import { Scene } from '@/types/Game';
import { startScene } from '../app/game/data';

interface GameState {
    //sceneIndex: number;
    //position: { x: number; y: number };
    //setScene: (index: number) => void;
    //nextScene: () => void;
    // prevScene: () => void;
    //moveCharacter: (dx: number, dy: number) => void;
    //sceneNum: number;
    //
    currScene: Scene;
    inDialogue: boolean;
    chatIndex: number;
}

export const useGameStore = create<GameState>((set) => ({
    currScene: startScene,
    inDialogue: true,
    chatIndex: 0,
    toggleDialogue: () =>
        set((state) => ({
            inDialogue: !state.inDialogue,
        })),
    nextChat: () =>
        set((state) => ({
            chatIndex: state.chatIndex + 1,
        })),
    changeScene: (scene: Scene) =>
        set((state) => ({
            currScene: scene,
        })),
}));
