import { create } from 'zustand';
import { Scene, Line } from '@/types/Game';
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
    customDialogue: Line[] | null;
    setCustomDialogue: (lines: Line[] | null) => void;

    pendingScene: string | null;
    setPendingScene: (scene: string | null) => void;

    correctAnswers: number;
    totalQuestions: number;
    incrementCorrect: () => void;
    incrementTotal: () => void;
    resetScore: () => void;
    incorrectChoices: number[];
    setIncorrectChoices: (choices: number[]) => void;
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
    changeScene: (scene: string) => {
        const newScene = game.get(scene);
        if (!newScene) return;
        set({
            currScene: newScene,
            incorrectChoices: [],
        });
    },

    customDialogue: null,
    setCustomDialogue: (lines) => set({ customDialogue: lines }),

    pendingScene: null,
    setPendingScene: (scene) => set({ pendingScene: scene }),

    correctAnswers: 0,
    totalQuestions: 0,
    incrementCorrect: () =>
        set((state) => ({ correctAnswers: state.correctAnswers + 1 })),
    incrementTotal: () =>
        set((state) => ({ totalQuestions: state.totalQuestions + 1 })),
    resetScore: () => set({ correctAnswers: 0, totalQuestions: 0 }),
    incorrectChoices: [],
    setIncorrectChoices: (choices: number[]) =>
        set({ incorrectChoices: choices }),
}));
