import { create } from 'zustand';
import { Scene } from '@/types/Game';
import { startScene, game } from '../app/game/data';

/**
 * Notes:
 *
 * currScene = scene being shown
 * inDialogue true = in dialogue, false = in action
 * chatIndex used to progress dialogue and actions.
 * toggleDialogue() switches from dialogue to action and vice versa
 * nextChat() progresses along dialogue by one line
 * changeScene changes currScene to argument.
 */

interface GameState {
    currScene: Scene;
    inDialogue: boolean;
    chatIndex: number;
    toggleDialogue: () => void;
    nextChat: () => void;
    changeScene: (sceneName: string) => void;
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
    changeScene: (scene: string) =>
        set(() => ({
            currScene: game.get(scene),
        })),
}));
