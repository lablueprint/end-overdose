// Sameple data for the game
import { Game, Scene, Character, Action, Choice } from '@/types/Game';

const girl1: Character = {
    name: 'Sara',
    avatar: 'https://png.pngtree.com/element_pic/16/12/20/325f9f6d9939429b528e911224ab40db.jpg',
    dialogue: [
        'Hey, I’m Sara. I’m so glad you’re here. I need your help.',
        'I’m not feeling so great. Can you help me?',
    ],
};

const girl2: Character = {
    name: 'Jenny',
    avatar: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/07/Cute-girl-on-transparent-background-PNG.png',
    dialogue: ['Oh no, what do I do?'],
};

const boy1: Character = {
    name: 'Alex',
    avatar: 'https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-cartoon-happy-school-boy-waving-hand-png-image_4691658.png',
    dialogue: ['Yay, I’m so happy you helped Sara.'],
};

const choice1: Choice = {
    text: 'Help her',
    nextScene: 'endScene',
};

const choice2: Choice = {
    text: 'Leave her to die',
    nextScene: 'Wrong Action',
};

const action1: Action = {
    type: 'decision',
    choices: [choice1, choice2],
};

const startScene: Scene = {
    scene: 'startScene',
    background:
        'https://t4.ftcdn.net/jpg/09/73/50/57/360_F_973505756_ufXazX15LJE69Vzl8UIBw8mv9qHHKgGc.jpg',
    characters: [girl1, girl2],
    actions: [action1],
};

const endScene: Scene = {
    scene: 'endScene',
    background:
        'https://thumbs.dreamstime.com/b/yellow-bus-road-front-school-building-exterior-back-to-pupils-transport-concept-cityscape-background-flat-horizontal-141738978.jpg',
    characters: [boy1],
    actions: [],
};

export const game: Game = new Map<string, Scene>([
    ['startScene', startScene],
    ['endScene', endScene],
]);
