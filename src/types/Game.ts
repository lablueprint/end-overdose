export type Character = {
    name: string;
    avatar: string;
    dialogue: Array<string>;
};

export type Choice = {
    text: string;
    nextScene: string;
};

export type Action = {
    type: string;
    choices: Array<Choice>;
};

export type Scene = {
    scene: string;
    background: string;
    characters: Array<Character>;
    actions: Array<Action>;
};

export type Game = Map<string, Scene>; // Maps scene name to scene data
