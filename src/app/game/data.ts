// Sameple data for the game
import { Game, Scene, Character, Action, Choice } from '@/types/Game';

const girl1: Character = {
    name: 'Sara',
    avatar: '/game_test_data/girl1.png',
    dialogue: [
        'Hey, I’m Sara. I’m so glad you’re here. I need your help.sdfghjbvcfghjmnbvfghjkmnbvfghjhbvghjuikbgtyuijkhgtyuijbvcfdrtyuijbvfgtyuikjbvfgtyuikjnbghyuikjhgb',
        'I’m not feeling so great. Can you help me?',
    ],
};

const girl2: Character = {
    name: 'Jenny',
    avatar: '/game_test_data/girl2.png',
    dialogue: ['Oh no, what do I do?'],
};

const boy1: Character = {
    name: 'Alex',
    avatar: '/game_test_data/boy1.webp',
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
    background: '/game_test_data/classroom.jpg',
    characters: [girl1, girl2],
    actions: [action1],
};

const endScene: Scene = {
    scene: 'endScene',
    background: '/game_test_data/school.webp',
    characters: [boy1],
    actions: [],
};

export const game: Game = new Map<string, Scene>([
    ['startScene', startScene],
    ['endScene', endScene],
]);
