// types.ts
export interface ResponseOption {
    text: string;
    next: number;
}

export interface DialogueNode {
    id: number;
    text: string;
    responses: ResponseOption[];
}

export interface DialogueData {
    [key: number]: DialogueNode;
}
