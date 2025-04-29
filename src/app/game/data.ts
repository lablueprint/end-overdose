// Sameple data for the game
import { Game, Scene, Character, Action, Choice, Line } from '@/types/Game';
const character1: Character = {
    name: 'NARCAT',
    avatar: '/character1.png',
};

const line1_1: Line = {
    name: 'NARCAT',
    text: 'Howdy! If you’re reading this, it must be March 10,,, in that case... \n HAPPY MARIO DAY YA’LL!',
};

const line1_2: Line = {
    name: 'NARCAT',
    text: 'For Mario Day, Let’s try some trivia... What is the name of Daisy’s homeland?',
};

const choice1_1: Choice = {
    text: 'Sarasland',
    nextScene: 'resultScene',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'Yippee Ki Yay! That’s correct!',
        },
    ],
};

const choice1_2: Choice = {
    text: 'The Broccoli Kingdom',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'That’s not quite right... Try again partner!',
        },
    ],
};

const choice1_3: Choice = {
    text: 'New York City',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'That’s not quite right... Try again partner!',
        },
    ],
};

const choice1_4: Choice = {
    text: 'The Mushroom Kingdom',
    nextScene: 'Wrong Action',
    nextDialogue: [
        {
            name: 'NARCAT',
            text: 'That’s not quite right... Try again partner!',
        },
    ],
};

const action1: Action = {
    type: 'decision',
    question: 'What is the name of Daisy’s homeland?',
    choices: [choice1_1, choice1_2, choice1_3, choice1_4],
};

export const startScene: Scene = {
    scene: 'startScene',
    background: '/background1.png',
    characters: [character1],
    actions: [action1],
    dialogue: [line1_1, line1_2],
};
export const resultScene: Scene = {
    scene: 'resultScene',
    background: '/background1.png', // or blank if you want
    characters: [],
    actions: [],
    dialogue: [],
};

export const game: Game = new Map<string, Scene>([
    ['startScene', startScene],
    ['resultScene', resultScene],
]);

// const girl1: Character = {
//     name: 'NARCAT',
//     avatar: '/character1.png',
// };

// const girl2: Character = {
//     name: 'Jenny',
//     avatar: '/game_test_data/boots.webp',
// };

// const line1_1: Line = {
//     name: 'Sara',
//     text: 'Hey, I’m Sara. I’m so glad you’re here. I need your help.sdfghjbvcfghjmnbvfghjkmnbvfghjhbvghjuikbgtyuijkhgtyuijbvcfdrtyuij',
// };

// const line1_2: Line = {
//     name: 'Jenny',
//     text: 'I am glad you are here too!',
// };

// const line1_3: Line = {
//     name: 'Sara',
//     text: 'I’m not feeling so great. Can you help me?',
// };

// const boy1: Character = {
//     name: 'Alex',
//     avatar: '/game_test_data/boy1.webp',
// };

// const line2_1: Line = {
//     name: 'Alex',
//     text: 'Yay, I’m so happy you helped Sara.',
// };

// const choice1_1: Choice = {
//     text: 'Help her',
//     nextScene: 'nextChoice',
// };

// const choice1_2: Choice = {
//     text: 'Eat some gum',
//     nextScene: 'Wrong Action',
// };

// const choice1_3: Choice = {
//     text: 'Burp',
//     nextScene: 'Wrong Action',
// };

// const choice1_4: Choice = {
//     text: 'Leave her to die',
//     nextScene: 'Wrong Action',
// };

// const choice2_1: Choice = {
//     text: 'Give her CPR',
//     nextScene: 'Wrong Action',
// };

// const choice2_2: Choice = {
//     text: 'Call 911 and lay then on their side',
//     nextScene: 'endScene',
// };

// const action1: Action = {
//     type: 'decision',
//     choices: [choice1_1, choice1_2, choice1_3, choice1_4],
// };

// const action2: Action = {
//     type: 'decision',
//     choices: [choice2_1, choice2_2],
// };

// export const startScene: Scene = {
//     scene: 'startScene',
//     background: '/background1.png',
//     characters: [girl1, girl2],
//     actions: [action1, action2],
//     dialogue: [line1_1, line1_2, line1_3],
// };

// export const endScene: Scene = {
//     scene: 'endScene',
//     background: '/game_test_data/school.webp',
//     characters: [boy1],
//     actions: [],
//     dialogue: [line2_1],
// };

// export const game: Game = new Map<string, Scene>([
//     ['startScene', startScene],
//     ['endScene', endScene],
// ]);
