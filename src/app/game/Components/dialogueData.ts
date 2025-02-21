import { DialogueData } from './types';

const dialogueData: DialogueData = {
    1: {
        id: 1,
        text: "Let's also explore branching dialogue",
        responses: [
            { text: 'What the hell is branching dialogue', next: 2 },
            { text: 'Bro your div looks ugly', next: 5 },
        ],
    },
    2: {
        id: 2,
        text: 'Now, the text is going to change based off of your response to me',
        responses: [
            { text: 'You can even go backwards?', next: 1 },
            {
                text: "omg i'm actually using a tree rn i never thought i would actually need this knowledge",
                next: 3,
            },
        ],
    },
    3: {
        id: 3,
        text: "Ehrm acktually simple trees don't have cycles so this is a cyclical graph",
        responses: [{ text: 'kys', next: 4 }],
    },
    4: {
        id: 4,
        text: 'Dies',
        responses: [{ text: 'go back to start', next: 1 }],
    },
    5: {
        id: 5,
        text: 'Yeah im totally not writing this last minute ',
        responses: [{ text: 'go back to start', next: 1 }],
    },
};

export default dialogueData;
