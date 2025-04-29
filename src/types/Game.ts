/**
 * Notes:
 *
 * Character = 1 of 3 visible characters in the game
 *
 * Line = dialogue line said by specificed character
 *
 *Choice = think of linkedList node where value = textString on what to do and nextScene is the name of the nextScene (mapped in Game to actual Scene object, but using string for simplicity). An empty string reflects a wrong answer.
 *
 * Action = Each action contains choices. So each time you are asked a question and have choices, that is an entire action. The choices themselves are choices. A bit confusing.
 *
 * Scene = contains the string ID with scene, the background img file path, and a list of characters, actions, and dialogue (array of lines) from imported JSON.
 *
 * Any questions ask Dalton or Cheryl.
 */

export type Character = {
    name: string;
    avatar: string;
};

export type Line = {
    name: string;
    text: string;
};

export type Choice = {
    text: string;
    nextScene: string;
    nextDialogue?: Line[];
};

export type Action = {
    type: 'decision';
    question: string;
    choices: Array<Choice>;
};

export type Scene = {
    scene: string;
    background: string;
    characters: Array<Character>;
    actions: Array<Action>;
    dialogue: Array<Line>;
};

export interface SceneProp {
    scene: Scene;
}

export type Game = Map<string, Scene>; // Maps scene name to scene data
