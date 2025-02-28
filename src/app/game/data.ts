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
    avatar: '/game_test_data/boots.webp',
    dialogue: ['Oh no, what do I do?'],
};

const boy1: Character = {
    name: 'Alex',
    avatar: '/game_test_data/boy1.webp',
    dialogue: ['Yay, I’m so happy you helped Sara.'],
};

const choice1_1: Choice = {
    text: 'Help her',
    nextScene: 'nextChoice',
};

const choice1_2: Choice = {
    text: 'Eat some gum',
    nextScene: 'Wrong Action',
};

const choice1_3: Choice = {
    text: 'Burp',
    nextScene: 'Wrong Action',
};

const choice1_4: Choice = {
    text: 'Leave her to die',
    nextScene: 'Wrong Action',
};

const choice2_1: Choice = {
    text: 'Give her CPR',
    nextScene: 'Wrong Action',
};

const choice2_2: Choice = {
    text: 'Call 911 and lay then on their side',
    nextScene: 'endScene',
};

const action1: Action = {
    type: 'decision',
    choices: [choice1_1, choice1_2, choice1_3, choice1_4],
};

const action2: Action = {
    type: 'decision',
    choices: [choice2_1, choice2_2],
};

const startScene: Scene = {
    scene: 'startScene',
    background: '/game_test_data/classroom.jpg',
    characters: [girl1, girl2],
    actions: [action1, action2],
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
